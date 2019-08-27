const express     = require('express');
const bodyParser  = require('body-parser');
const passport	  = require('passport');
// const mongoose    = require('mongoose');
// const config      = require('./config/config');
const db          = require('./config/database');
const port        = process.env.PORT || 9000; 
const cors        = require('cors');
const app = express();
app.use(cors());




// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Use the passport package in our application
app.use(passport.initialize());
const passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);



// // Demo Route (GET http://localhost:9000)
// app.get('/', function(req, res) {
//   return res.send('Welcome to Panganud Project');
// });
 
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
    console.log('Connection has been established successfully to DB SERVER at ' + global.gConfig.databasehost);
  })
  .catch(err => {
    console.error('Unable to connect to the database at ' + global.gConfig.databasehost +":", err);
  });





module.exports = app;
// Start the server
// app.listen(port);
// console.log('Running Panganud Server at http://localhost:' + port);

