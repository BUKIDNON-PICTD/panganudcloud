var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


io.on('connection', function (socket) {
  socket.on('checkinserveronline',function(serverid){
  	console.log('serverid = ' + serverid + ' is CONNECTED')
    io.emit('onlineservers', serverid);
  });
  
  socket.on('disconnect', function () {
    console.log('the client has disconnected!');
  });

  socket.on('Message', function(data, fn) {
   // console.log('pass data to client');
    io.emit('Message', data);
  });

});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 9000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Running Panganud Server at ", addr.address + ":" + addr.port);
});

