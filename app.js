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
io.on('connection', function (socket) {
  var addedServer = false;
  
  socket.on('message', (data) => {
    socket.broadcast.emit('message', {
      servername: socket.servername,
      message: data
    });
  });
  
  
  socket.on('checkinserveronline',function(serverid){
    if (addedServer) return;

    socket.servername=serverid;
    ++numServers;
    addedServer = true;
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

server.listen(process.env.PORT || 9000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Running Panganud Server at ", addr.address + ":" + addr.port);
});

