const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./config/tagabukidpanganuddb');
const cors = require('cors');
const routes = require('./routes/routes');

//initialize express
const app = express();
//enable cors
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
// get our request parameters
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());
const passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

//api routes
app.use('/api', routes);


// app.get("/covidsubay", function (req, res) {
//   res.render("covid/index");
// });

// app.get("/covidadvisories", function (req, res) {
//   res.render("covid/advisories");
// });

app.post('/messagepy', (req, res) => {
  io.emit("messagepy", req.body.message);
  return res.json({
    msg: `Message Sent!`
  });
});



//test connect to database
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully to DB SERVER at ' + global.gConfig.databasehost);
  })
  .catch(err => {
    console.error('Unable to connect to the database at ' + global.gConfig.databasehost + ":", err);
  });

module.exports = app;
