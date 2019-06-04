const config = require('./src/config/config');
const app = require("./src/server");
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
// require('./src/socket')(io);
io.origins("*:*");
var passport = require('passport');

var numServers = 0;
let connectedServers = { };
let serverList = [];        
io.on('connection', function (socket) {
    var addedServer = false;
   
    socket.on('message', (data) => {
      socket.broadcast.emit('message', {
        servername: socket.servername,
        message: data
      });
    });

    // socket.on('serverrequest', function (params) {
    //   if(params.reciever in connectedServers){
    //     const recieverSocket = connectedServers[params.reciever].id
    //     socket.to(recieverSocket).emit('serverrequest',params.sender, params);
    //   }
    // });
  
    // socket.on('serverresponse', function (sender, data) {
    //   if(sender in connectedServers){
    //     const senderSocket = connectedServers[sender].id
    //     socket.to(senderSocket).emit('serverresponse', data);
    //   }
    // });
    
    setInterval(function(){
      io.emit('connectedservers', {
        serverList: serverList,
        numServers: numServers
      });
    },10000);

    // socket.emit('serverrequestbukidnon','test',function(data){
    //   console.log(data);
    // });
    // socket.emit('serverrequestralph','test',function(data){
    //   console.log(data);
    // });
    // socket.emit('serverrequestjade','test',function(data){
    //   console.log(data);
    // });
    // socket.emit('serverrequestrufy','test',function(data){
    //   console.log(data);
    // });

    app.post('/serverrequest', passport.authenticate('jwt', { session: false }), (req, res) => {
      console.log("REQUEST FROM: " + req.body.sender + " to " + req.body.reciever);
      socket.emit('serverrequest'+ req.body.reciever, req.body, function (data) {
        res.json(data).status(200);
      });
    });

    socket.on('checkinserveronline',function(serverid){
      if (addedServer) return;
  
      socket.servername=serverid;
      ++numServers;
      addedServer = true;
      connectedServers =  addServer(connectedServers,socket);
      serverList.push(serverid);
      console.log(socket.servername + ' is ONLINE');
      socket.emit('login', {
        numServers: numServers
      });
      socket.emit('serverrequest'+serverid,'test',function(data){
      	 console.log(data);
      });
      socket.broadcast.emit('serveronline', {
        serverList: serverList,
        servername: socket.servername,
        numServers: numServers
      });
    });
    
    socket.on('disconnect', () => {
      if (addedServer) {
        --numServers;
        console.log(socket.servername + ' is OFFLINE');
        connectedServers = removeServer(connectedServers, socket.servername);
        serverList.splice( serverList.indexOf(socket.servername), 1 );
        socket.broadcast.emit('serveroffline', {
          serverList: serverList,
          servername: socket.servername,
          numServers: numServers
        });
      }
    });
  });
  
  function addServer(serverList, socket){
      let newList = Object.assign({}, serverList)
      newList[socket.servername] = socket
      return newList
  }
  
  function removeServer(serverList, servername){
      let newList = Object.assign({}, serverList)
      delete newList[servername]
      return newList
  }


 



server.listen(process.env.PORT || 9000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Running Panganud Server at ", addr.address + ":" + addr.port);
});


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
