var   fs         = require("fs");
const express    = require('express');
const bodyParser = require('body-parser');
const passport   = require('passport');
const config     = require("./src/config/config");
// const app        = require("./src/server");
const db   = require('./src/config/tagabukidpanganuddb');
const cors = require('cors');
const http = require("http");
var qrlocations = require('./src/models/qrlocations');

const app = express();
app.use(cors());

const server = http.createServer(app);
const ioreq  = require("socket.io-request");
const io     = require("socket.io")(server);
// require('./src/socket')(io);
const dirTree = require("directory-tree");
  path = require("path"),
  _ = require("underscore");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
const passportMiddleware = require('./src/middleware/passport');
passport.use(passportMiddleware);

const routes = require('./src/routes');
app.use('/api', routes);

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully to DB SERVER at ' + global.gConfig.databasehost);
  })
  .catch(err => {
    console.error('Unable to connect to the database at ' + global.gConfig.databasehost +":", err);
  });

app.set("view engine", "ejs");
app.use("/scripts", express.static(__dirname + "/node_modules/admin-lte/"));
app.use("/spagenda", express.static(__dirname + "/mnt/spagenda/"));

io.origins("*:*");

var numClients = 0;
let connectedClients = {};
let clientList = [];

io.on("connection", function (socket) {
  console.log('a user connected');
  // var addedServer = false;
  var addedClient = false;

  setInterval(function () {
    io.emit("clientlistupdate", {
      clientList: clientList
    });
  }, 10000);



  socket.on("message", data => {
    console.log(data);

    var d = new Date(data.timestamp);
    io.emit("update", {
      client: socket,
      profile: data.profile,
      timestamp: d.toDateString() + '-' + d.toLocaleTimeString()
    });
  });
 
  socket.on("clientcheckin", async function (clientinfo) {

    if (clientinfo){
      if (addedClient) return;
      // console.log( clientinfo.find(i => i.name === 'clientid').value);
      socket = clientinfo[0];
      const location = await qrlocations.findOne({
          where: {
              locationid: clientinfo[0].locationid
          },
      });
      location.objid = clientinfo[0].objid;
      ++numClients;
      addedClient = true;
      connectedClients = addClient(connectedClients, socket);
      clientList.push(location);
      console.log(location.locationname + " is ONLINE");
 
      io.emit("clientlistupdate", {
        clientList: clientList
      });
  }
  });

  socket.on("disconnect", async () => {
    console.log('a user disconnected');
    if (addedClient) {
      --numClients;
      const location = await qrlocations.findOne({
          where: {
              locationid: socket.locationid
          },
      });
      location.objid = socket.objid;
      console.log(location.locationname + " is OFFLINE");
      connectedClients = removeClient(connectedClients, location.objid);
      clientList.splice(clientList.indexOf(location), 1);
      io.emit("clientlistupdate", {
        clientList: clientList
      });
    }
  });
});


function addClient(clientList, socket) {
  let newList = Object.assign({}, clientList);
  newList[socket.objid] = socket;
  return newList;
}

function removeClient(clientList, objid) {
  let newList = Object.assign({}, clientList);
  delete newList[objid];
  return newList;
}


app.get("/covidsubay", function (req, res) {
  res.render("covid/index");
});

app.post('/messagepy', (req, res) => {
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
