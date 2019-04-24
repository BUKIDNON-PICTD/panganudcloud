const config = require('./src/config/config');

const app = require("./src/server");
// const app = require('express')();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
const http = require('http');
const socketIO = require('socket.io')
const server = http.createServer(app);
const io = socketIO(server);
io.origins("*:*");


var numServers = 0
let connectedServers = { }
io.on('connection', function (socket) {
  var addedServer = false;
  
  socket.on('message', (data) => {
    socket.broadcast.emit('message', {
      servername: socket.servername,
      message: data
    });
  });
  
  socket.on('serverrequest', function (reciever, sender, params) {
    if(reciever in connectedServers){
      const recieverSocket = connectedServers[reciever].id
      socket.to(recieverSocket).emit('serverrequest',sender, params);
    }
  });

  socket.on('serverresponse', function (sender, data) {
    if(sender in connectedServers){
      const senderSocket = connectedServers[sender].id
      socket.to(senderSocket).emit('serverresponse', data);
    }
  });
  
  
  socket.on('checkinserveronline',function(serverid){
    if (addedServer) return;

    socket.servername=serverid;
    ++numServers;
    addedServer = true;
    connectedServers =  addServer(connectedServers,socket);
    console.log(socket.servername + ' is ONLINE');
    socket.emit('login', {
      numServers: numServers
    });
    socket.broadcast.emit('serveronline', {
      servername: socket.servername,
      numServers: numServers
    });
  });
  
  socket.on('disconnect', () => {
    if (addedServer) {
      --numServers;
      console.log(socket.servername + ' is OFFLINE');
      connectedServers = removeServer(connectedServers, socket.servername);
      socket.broadcast.emit('serveroffline', {
        servername: socket.servername,
        numServers: numServers
      });
    }
  });

});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
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