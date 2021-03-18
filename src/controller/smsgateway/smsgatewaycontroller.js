const { NodeSSH } = require("node-ssh");
const ssh = new NodeSSH();
var Subscribers = require("../../models/subscribers");

exports.sendsms = async (req, res) => {
  try {
    const { message, mobileno } = req.body;
    ssh
      .connect({
        host: global.gConfig.smsserver,
        username: "root",
        privateKey: "./.ssh/id_rsa",
      })
      .then(function () {
        ssh
          .execCommand(
            '/home/administrator/smsgateway/scripts/sendsms.sh -m="' +
              message +
              '" -n="' +
              mobileno +
              '"'
          )
          .then(function (result) {
            let datesent = new Date();
            result = result.stdout.split("\n");
            console.log("STDOUT: " + result);
            return res
              .status(200)
              .json({ message: result, timestamp: datesent });
          });
      });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.notifySubscribers = async (req, res) => {
  try {
    const subscribers = await Subscribers.findAll({
      where: {
        state: "ACTIVE",
      },
    });
    const { title, eventid, message } = req.body;
    let sms = '"' + title + " MSG: " + message + '"';
    let ret1 = await initializesmsbatch();
    console.log(ret1);

    for (const subscriber of subscribers) {
      let ret2 = await createsmsbatchfile(sms, subscriber);
      console.log(ret2);
    };

    let ret3 = await sendsms();
    console.log("STDOUT: " + ret3.stdout);
    console.log("STDERR: " + ret3.stderr);

    return res.status(200).json(subscribers);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

initializesmsbatch = () => {
  return new Promise((resolve, reject) => {
    ssh
      .connect({
        host: global.gConfig.smsserver,
        username: "root",
        privateKey: "./.ssh/id_rsa",
      })
      .then(function () {
        ssh
          .execCommand(
            `echo "#message list" > /home/administrator/smsgateway/scripts/sendmasssms.sh`
          )
          .then(function (result) {
            resolve("Initialize batch sms.");
          });
      });
  });
};

createsmsbatchfile = (sms, subscriber) => {
  return new Promise((resolve, reject) => {
    ssh
      .connect({
        host: global.gConfig.smsserver,
        username: "root",
        privateKey: "./.ssh/id_rsa",
      })
      .then(function () {
        ssh
          .execCommand(
            `echo gammu sendsms TEXT +63` +
              subscriber.mobile_number +
              ` -text '\"'` +
              sms +
              `'\"'\r >> /home/administrator/smsgateway/scripts/sendmasssms.sh`
          )
          .then(function (result) {
            resolve(
              "Message for: " +
                subscriber.mobile_number +
                " added to batch file"
            );
          });
      });
  });
};

sendsms = () => {
  return new Promise((resolve, reject) => {
    ssh
      .connect({
        host: global.gConfig.smsserver,
        username: "root",
        privateKey: "./.ssh/id_rsa",
      })
      .then(function () {
        ssh
          .execCommand(`/home/administrator/smsgateway/scripts/sendmasssms.sh`)
          .then(function (result) {
           resolve(result);
          });
      });
  });
};
