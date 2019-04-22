var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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
    socket.broadcast.emit('server online', {
      servername: socket.servername,
      numServers: numServers
    });
  });
  
  socket.on('disconnect', () => {
    if (addedServer) {
      --numServers;
      console.log(socket.servername + ' is OFFLINE');
      socket.broadcast.emit('server offline', {
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

