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

var auditlogrunning = false;
async function x() {
  // let root = dirTree('C:/Users/user/Desktop/LogFiles/LogFiles');
  // const newArray = root.children.slice(0, 25);
  // let result = await geoserverauditlogs.migrate(newArray);
  // console.log(result);
  // // if (naapa){
  // //   x();
  // // }

  // console.log('before promise call')
  //3. Await for the first function to complete
  let result = await geoserverauditlogs.migrate()
  console.log('promise resolved: ' + result)
  // console.log('next step');

  smb2Client.readdir('auditlogs', function (err, files) {
    if (err) {
      auditlogrunning = false;
    }
    if (files) {
      auditlogrunning = true;
      x();
    }
  });


}

var rule = new schedule.RecurrenceRule();
rule.hour = 17;
rule.minute = 0;
var j = schedule.scheduleJob(rule, function(){
  if (!auditlogrunning){
    x();
  }
});



server.listen(
  process.env.PORT || 9000,
  process.env.IP || "0.0.0.0",
  function () {
    var addr = server.address();
    console.log("Panganud Server at ", addr.address + ":" + addr.port);
  }
);