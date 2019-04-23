const express     = require('express');
const bodyParser  = require('body-parser');
const passport	  = require('passport');
// const mongoose    = require('mongoose');
// const config      = require('./config/config');
const db          = require('./config/database');
const port        = process.env.PORT || 9000; 
const cors        = require('cors');
// const server = require('http').Server(express);
// const io = require('socket.io')(server);

const app = express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(cors());



// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Use the passport package in our application
app.use(passport.initialize());
const passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);
 
// Demo Route (GET http://localhost:9000)
app.get('/', function(req, res) {
  return res.send('Hello! The API is at http://localhost:' + port + '/api');
});
 
const routes = require('./routes');
app.use('/api', routes);
 
// mongoose.connect(config.db, { useNewUrlParser: true , useCreateIndex: true});
 
// const connection = mongoose.connection;
 
// connection.once('open', () => {
//     console.log('MongoDB database connection established successfully!');
// });
 
// connection.on('error', (err) => {
//     console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
//     process.exit();
// });

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
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
console.log('Running Panganud Server at http://localhost:' + port);

// server.listen(process.env.PORT || 9000, process.env.IP || "0.0.0.0", function(){
//   var addr = server.address();
//   console.log("Running Panganud Server at ", addr.address + ":" + addr.port);
// });