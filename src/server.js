var express     = require('express');
var bodyParser  = require('body-parser');
var passport	= require('passport');
var mongoose    = require('mongoose');
var config      = require('./config/config');
var port        = process.env.PORT || 5000; 
var cors        = require('cors');
var server = require('http').Server(express);
var io = require('socket.io')(server);

var app = express();
app.use(cors());
 
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);
 
// Demo Route (GET http://localhost:5000)
app.get('/', function(req, res) {
  return res.send('Hello! The API is at http://localhost:' + port + '/api');
});
 
var routes = require('./routes');
app.use('/api', routes);
 
mongoose.connect(config.db, { useNewUrlParser: true , useCreateIndex: true});
 
const connection = mongoose.connection;
 
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
 
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});


//socket
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

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);