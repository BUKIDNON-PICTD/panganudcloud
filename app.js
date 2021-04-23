const config = require("./src/config/config.js");
const app = require("./src/server");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

var schedule = require('node-schedule');

require('./src/socket')(io);
require('./src/spagenda')(app);

var geoserverauditlogs = require('./src/geoserverauditlogs');

async function x() {
  let result = await geoserverauditlogs.migrate()
  console.log('promise resolved: ' + result)
  if (result == "COMPLETED"){
    x();
  }
}

x();

// var j = schedule.scheduleJob('*/5 * * * *', function (fireDate) {
//   console.log("RUN AT:" + fireDate)
//   x();
// });


server.listen(
  process.env.PORT || 9000,
  process.env.IP || "0.0.0.0",
  function () {
    var addr = server.address();
    console.log("Panganud Server at ", addr.address + ":" + addr.port);
  }
);