const express = require("express");
const config = require("./src/config/config");
const app = require("./src/server");
const http = require("http");
const server = http.createServer(app);
const ioreq = require("socket.io-request");
const io = require("socket.io")(server);
// require('./src/socket')(io);
const dirTree = require("directory-tree");
var fs = require("fs"),
  path = require("path"),
  _ = require("underscore");

app.set("view engine", "ejs");
app.use("/scripts", express.static(__dirname + "/node_modules/admin-lte/"));
app.use("/spagenda", express.static(__dirname + "/mnt/spagenda/"));
io.origins("*:*");
var passport = require("passport");

var numServers = 0;
let connectedServers = {};
let serverList = [];
io.on("connection", function(socket) {
  var addedServer = false;

  socket.on("message", data => {
    socket.broadcast.emit("message", {
      servername: socket.servername,
      message: data
    });
  });

  socket.on("serverrequest", function(params) {
    if (params.reciever in connectedServers) {
      console.log("PROCESSING REQUEST FROM :" + params.sender);
      const recieverSocket = connectedServers[params.reciever].id;
      socket.to(recieverSocket).emit("serverrequest", params);
    }
  });

  socket.on("serverresponse", function(data) {
    if (data.sender in connectedServers) {
      console.log("SENDING RESPONSE TO :" + data.reciever);
      const senderSocket = connectedServers[data.reciever].id;
      socket.to(senderSocket).emit("serverresponse", data.result);
    }
  });

  setInterval(function() {
    io.emit("connectedservers", {
      serverList: serverList,
      numServers: numServers
    });
  }, 10000);

  //socket.emit('serverrequest','test',function(data){
  //   console.log(data);
  //});
  // socket.emit('serverrequestralph','test',function(data){
  //   console.log(data);
  // });
  // socket.emit('serverrequestjade','test',function(data){
  //   console.log(data);
  // });
  // socket.emit('serverrequestrufy','test',function(data){
  //   console.log(data);
  // });
  // app.get('/', function(req, res) {
  //   socket.emit('serverrequest', req.body, function (data) {
  //     res.json(data).status(200);
  //   });
  // });
  // socket.emit('serverrequest','test',function(data){
  //   console.log(data);
  // });
  //app.post('/serverrequest', passport.authenticate('jwt', { session: false }), (req, res) => {
  //  console.log("REQUEST FROM: " + req.body.sender + " to " + req.body.reciever);
  //  //socket.emit('serverrequest', req.body, function (data) {
  //  //	res.json(data).status(200);
  //  //});
  //	socket.broadcast.emit('serverrequest', req.body);
  //	io.on('serverresponse', resppHandler);
  //	function resppHandler(data) {
  //		console.log(data);
  //		res.json(data).status(200);
  //	}
  //socket.on('serverresponse', resphandler()function(data){
  //	//console.log(data.reciever + "-TRU");
  //	if(data.reciever === lguid){
  //		res.json(data.result).status(200);
  //	}
  //});
  //ioreq(io).request("serverrequest",req.body)
  //	.then(function(data){
  //	//console.log(res); // get {height: 528, width: 924}
  //	if(data.reciever === req.body.reciever){
  //		res.json(data.result).status(200);
  //	}
  //});
  //});

  socket.on("checkinserveronline", function(serverid) {
    if (addedServer) return;

    socket.servername = serverid;
    ++numServers;
    addedServer = true;
    connectedServers = addServer(connectedServers, socket);
    serverList.push(serverid);
    console.log(socket.servername + " is ONLINE");
    socket.emit("login", {
      numServers: numServers
    });
    // const recieverSocket = connectedServers[serverid].id
    // console.log(recieverSocket);
    // socket.emit('serverrequest'+recieverSocket,recieverSocket,function(data){
    // 	 console.log(data);
    // });
    socket.broadcast.emit("serveronline", {
      serverList: serverList,
      servername: socket.servername,
      numServers: numServers
    });
  });

  socket.on("disconnect", () => {
    if (addedServer) {
      --numServers;
      console.log(socket.servername + " is OFFLINE");
      connectedServers = removeServer(connectedServers, socket.servername);
      serverList.splice(serverList.indexOf(socket.servername), 1);
      socket.broadcast.emit("serveroffline", {
        serverList: serverList,
        servername: socket.servername,
        numServers: numServers
      });
    }
  });
});

function addServer(serverList, socket) {
  let newList = Object.assign({}, serverList);
  newList[socket.servername] = socket;
  return newList;
}

function removeServer(serverList, servername) {
  let newList = Object.assign({}, serverList);
  delete newList[servername];
  return newList;
}

function getMostRecentFileName(dir) {
  var files = fs.readdirSync(dir);

  // use underscore for max()
  return _.max(files, function(f) {
    var fullpath = path.join(dir, f);

    // ctime = creation time is used
    // replace with mtime for modification time
    return fs.statSync(fullpath).mtime;
  });
}

// console.log(tree);
app.get("/", function(req, res) {
  let agenda = req.query.agenda;
  let file = req.query.file;

  let root = dirTree("/usr/src/app/mnt/spagenda");

  var agendasort = [];
  root.children.forEach(function(agenda) {
    var agendaitemsort = [];
    agenda.children.forEach(function(agendaitem) {
      if (
        agendaitem.type == "file" &&
        (agendaitem.extension == ".htm" || agendaitem.extension == ".html")
      ) {
        var stats = fs.statSync(agendaitem.path);
        agendaitem.mtime = stats.mtime.getTime()
        agendaitemsort.push(agendaitem);
      }
    });
    if (agenda.type == 'directory'){
      var stats = fs.statSync(agenda.path)
      agenda.ctime = stats.ctime.getTime()
      agendasort.push(agenda);
    }
    agendaitemsort.sort(function(a,b) {
        return b.mtime - a.mtime;
    });
    agenda.children = agendaitemsort;
  });
  agendasort.sort(function(a,b){
    return b.ctime - a.ctime;
  });
  root.children = agendasort;

  res.render("pages/index", {
    agendalist: root.children,
    currentagenda: agenda,
    currentfile: file
  });
});

server.listen(
  process.env.PORT || 9000,
  process.env.IP || "0.0.0.0",
  function() {
    var addr = server.address();
    console.log("Panganud Server at ", addr.address + ":" + addr.port);
  }
);

// "reciever" : 'bukidnon',
// "sender" : "CLIENT1",
// "servicename"	: 'FarmerProfileService',
// "methodname"	: 'getFarmersList',
// "paging" 		: {
//   "start" : 0,
//   "limit" : 25
// },
// "searchtext": ''

// const app = require('express')();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// socket.on('requestdata', function(data,fn){
// 	console.log("FETCH DATA FROM "+ data.lguid +" USING SAMPLE PARAMETER = " + data.params);
//   console.log('SENDING DATA BACK TO PANGANUD SERVER');
// 	var sampledata = "HELLO " + data.sampleparam;
// 	fn(sampledata);
// });

// app.get('/:lguid/:service.:method/:name', function (req, res) {
//   socket.emit('serverrequest'+req.params.lguid, req.params,function(data){
//     console.log(data);
//     res.send(data);
//   });

// });
