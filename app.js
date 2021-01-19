const config = require("./src/config/config.js");
const app = require("./src/server");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const dirTree = require("directory-tree");

var SMB2 = require('smb2');
var schedule = require('node-schedule');

require('./src/socket')(io);
require('./src/spagenda')(app);
// require('./src/geoserverauditlogs')(app);

var geoserverauditlogs = require('./src/geoserverauditlogs');

var smb2Client = new SMB2({
  share: '\\\\172.16.2.55\\geoserverdata',
  domain: '',
  username: 'admin',
  password: 'PGB*4dm1n!',
  // debug: 0,
  autoCloseTimeout: 0
});

async function x() {
  let result = await geoserverauditlogs.migrate()
  console.log('promise resolved: ' + result)
  if (result == "COMPLETED"){
    x();
  }
}

var j = schedule.scheduleJob('*/5 * * * *', function (fireDate) {
  console.log("RUN AT:" + fireDate)
  x();
});



server.listen(
  process.env.PORT || 9000,
  process.env.IP || "0.0.0.0",
  function () {
    var addr = server.address();
    console.log("Panganud Server at ", addr.address + ":" + addr.port);
  }
);