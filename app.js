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

// var numServers = 0;
// let connectedServers = {};
// let serverList = [];


var numClients = 0;
let connectedClients = {};
let clientList = [];

io.on("connection", function (socket) {
  // var addedServer = false;
  var addedClient = false;

  // socket.on("message", data => {
  //   socket.broadcast.emit("message", {
  //     servername: socket.servername,
  //     message: data
  //   });
  // });

  // socket.on("serverrequest", function (params) {
  //   if (params.reciever in connectedServers) {
  //     console.log("PROCESSING REQUEST FROM :" + params.sender);
  //     const recieverSocket = connectedServers[params.reciever].id;
  //     socket.to(recieverSocket).emit("serverrequest", params);
  //   }
  // });

  // socket.on("serverresponse", function (data) {
  //   if (data.sender in connectedServers) {
  //     console.log("SENDING RESPONSE TO :" + data.reciever);
  //     const senderSocket = connectedServers[data.reciever].id;
  //     socket.to(senderSocket).emit("serverresponse", data.result);
  //   }
  // });

  setInterval(function () {
    io.emit("clientlistupdate", {
      clientList: clientList
    });
  }, 10000);


  // socket.on("checkinserveronline", function (serverid) {
  //   if (addedServer) return;

  //   socket.servername = serverid;
  //   ++numServers;
  //   addedServer = true;
  //   connectedServers = addServer(connectedServers, socket);
  //   serverList.push(serverid);
  //   console.log(socket.servername + " is ONLINE");
  //   socket.emit("login", {
  //     numServers: numServers
  //   });
  //   // const recieverSocket = connectedServers[serverid].id
  //   // console.log(recieverSocket);
  //   // socket.emit('serverrequest'+recieverSocket,recieverSocket,function(data){
  //   // 	 console.log(data);
  //   // });
  //   socket.broadcast.emit("serveronline", {
  //     serverList: serverList,
  //     servername: socket.servername,
  //     numServers: numServers
  //   });
  // });



  // socket.on("disconnect", () => {
  //   if (addedServer) {
  //     --numServers;
  //     console.log(socket.servername + " is OFFLINE");
  //     connectedServers = removeServer(connectedServers, socket.servername);
  //     serverList.splice(serverList.indexOf(socket.servername), 1);
  //     socket.broadcast.emit("serveroffline", {
  //       serverList: serverList,
  //       servername: socket.servername,
  //       numServers: numServers
  //     });
  //   }
  // });
  // socket.on("messagepy", data => {
    
  // });

  socket.on("message", data => {
    io.emit("update", {
      client: socket,
      profile: data.profile,
      timestamp: data.timestamp
    });
  });
 
  socket.on("clientcheckin", function (clientinfo) {
    if (addedClient) return;
    // console.log( clientinfo.find(i => i.name === 'clientid').value);
    socket = clientinfo;
    ++numClients;
    addedClient = true;
    connectedClients = addClient(connectedClients, socket);
    clientList.push(socket);
    console.log(socket.find(i => i.name === 'clientname').value + " is ONLINE");
    // socket.emit("login", {
    //   numClients: numClients
    // });
    // const recieverSocket = connectedServers[serverid].id
    // console.log(recieverSocket);
    // socket.emit('serverrequest'+recieverSocket,recieverSocket,function(data){
    // 	 console.log(data);
    // });
    io.emit("clientlistupdate", {
      clientList: clientList
    });
  });

  socket.on("disconnect", () => {
    if (addedClient) {
      --numClients;
      console.log(socket.find(i => i.name === 'clientname').value + " is OFFLINE");
      connectedClients = removeClient(connectedClients, socket.find(i => i.name === 'clientid').value);
      clientList.splice(clientList.indexOf(socket), 1);
      io.emit("clientlistupdate", {
        clientList: clientList
      });
    }
  });
});


// function addServer(serverList, socket) {
//   let newList = Object.assign({}, serverList);
//   newList[socket.servername] = socket;
//   return newList;
// }

// function removeServer(serverList, servername) {
//   let newList = Object.assign({}, serverList);
//   delete newList[servername];
//   return newList;
// }

function addClient(clientList, socket) {
  let newList = Object.assign({}, clientList);
  newList[socket.clientid] = socket;
  return newList;
}

function removeClient(clientList, clientid) {
  let newList = Object.assign({}, clientList);
  delete newList[clientid];
  return newList;
}


app.get("/covidsubay", function (req, res) {
  res.render("covid/index");
});

app.post('/messagepy', (req, res) => {
  console.log(req.body)
  io.emit("messagepy", req.body.message);  
  return res.json({ msg: `Message Sent!` });
});

function getMostRecentFileName(dir) {
  var files = fs.readdirSync(dir);

  // use underscore for max()
  return _.max(files, function (f) {
    var fullpath = path.join(dir, f);

    // ctime = creation time is used
    // replace with mtime for modification time
    return fs.statSync(fullpath).mtime;
  });
}

// console.log(tree);
app.get("/", function (req, res) {
  let agenda = req.query.agenda;
  let file = req.query.file;

  let root = dirTree("/usr/src/app/mnt/spagenda");

  var agendasort = [];
  root.children.forEach(function (agenda) {
    var agendaitemsort = [];
    agenda.children.forEach(function (agendaitem) {
      if (
        agendaitem.type == "file" &&
        (agendaitem.extension == ".htm" || agendaitem.extension == ".html")
      ) {
        var stats = fs.statSync(agendaitem.path);
        agendaitem.mtime = stats.mtime.getTime()
        agendaitemsort.push(agendaitem);
      }
    });
    if (agenda.type == 'directory') {
      var stats = fs.statSync(agenda.path)
      agenda.ctime = stats.ctime.getTime()
      agendasort.push(agenda);
    }
    agendaitemsort.sort(function (a, b) {
      return b.mtime - a.mtime;
    });
    agenda.children = agendaitemsort;
  });
  agendasort.sort(function (a, b) {
    return b.ctime - a.ctime;
  });
  root.children = agendasort;
  if (!agenda) {
    agenda = root.children[0].name
    file = root.children[0].children[0].name
  }
  res.render("pages/index", {
    agendalist: root.children,
    currentagenda: agenda,
    currentfile: file
  });
});

server.listen(
  process.env.PORT || 9000,
  process.env.IP || "0.0.0.0",
  function () {
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