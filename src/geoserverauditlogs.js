var fs = require("fs");
const xml2js = require("xml2js");
var auditlog = require("./models/geoserveraudit");

exports.migrate = async () => {
  const selectedfiles = await getlogfiles();
  return new Promise(async (resolve, reject) => {
    console.log("START");
    console.log(selectedfiles);
    for (const logfile of selectedfiles) {
      // if (logfile != "xauditlogs") {
        try {
          const data = await readlogfile(logfile);
          const auditlogs = await parsefile(data, logfile);
          if (auditlogs != "NOLOGS") {
            const ret1 = await migratelogfile(auditlogs, logfile);
            console.log(ret1);
            const ret2 = await deletefiles(logfile);
            console.log(ret2);
          } else {
            resolve("END");
          }
        } catch (error) {
          console.log(error);
        }
      // }
    }
    resolve("COMPLETED");
  });
};

deletefiles = (logfile) => {
  return new Promise((resolve, reject) => {
    fs.unlink("./mnt/geoserver/monitoring/"+ global.gConfig.geoserverauditlogfolder +"/" + logfile, function (err) {
      if (err) throw err;
      resolve("file has been deleted :" + logfile);
    });
  });
};

parsefile = (data, logfile) => {
  var parser = new xml2js.Parser();
  var auditlogs = [];
  return new Promise((resolve, reject) => {
    parser.parseString(data, async function (err, result) {
      // console.dir(JSON.stringify(result.Requests));
      try {
        for (let req of result.Requests.Request) {
          if (req) {
            var newlog = {
              // id: req.$.id,
              Service: req.Service[0],
              Version: req.Version[0],
              Operation: req.Operation[0],
              SubOperation: req.SubOperation[0],
              Resources: req.Resources[0],
              ResourcesProcessingTime: req.ResourcesProcessingTime[0],
              LabelsProcessingTime: req.LabelsProcessingTime[0],
              Path: req.Path[0],
              QueryString: req.QueryString[0],
              Body: req.Body[0],
              HttpMethod: req.HttpMethod[0],
              StartTime: req.StartTime[0],
              EndTime: req.EndTime[0],
              TotalTime: req.TotalTime[0],
              RemoteAddr: req.RemoteAddr[0],
              RemoteHost: req.RemoteHost[0],
              Host: req.Host[0],
              RemoteUser: req.RemoteUser[0],
              ResponseStatus: req.ResponseStatus[0],
              ResponseLength: req.ResponseLength[0],
              ResponseContentType: req.ResponseContentType[0],
              CacheResult: req.CacheResult[0],
              MissReason: req.MissReason[0],
              Failed: req.Failed[0],
            };
            // console.log(newlog);
            // let log = await auditlog.create(newlog);
            // console.log(log.id);
            auditlogs.push(newlog);
            resolve(auditlogs);
          }
        }
      } catch (error) {
        resolve("NOLOGS");
        // throw error;
      }
    });
  });
};

getlogfiles = (_) => {
  return new Promise((resolve, reject) => {
    fs.readdir("./mnt/geoserver/monitoring/"+ global.gConfig.geoserverauditlogfolder, async function (err, files) {
      if (err) throw err;
      resolve(
        files.slice(0, 50).map((i) => {
          return i;
        })
      );
    });
  });
};

migratelogfile = (auditlogs, logfile) => {
  return new Promise((resolve, reject) => {
    auditlog
      .bulkCreate(auditlogs)
      .then(() => {
        // Notice: There are no arguments here, as of right now you'll have to...
        resolve("file migrated :" + logfile);
      })
      .then((logs) => {
        // console.log(logs) // ... in order to get the array of user objects
      });
  });
};

readlogfile = (logfile) => {
  return new Promise((resolve, reject) => {
    fs.readFile("./mnt/geoserver/monitoring/"+ global.gConfig.geoserverauditlogfolder + "/" + logfile, function (err, data) {
      if (err) resolve(err);
      resolve(data);
    });
  });
};

// removefiles = (logfile) => {
//   return new Promise((resolve, reject) => {
//     smb2Client.rename(
//       "auditlogs\\" + logfile,
//       "auditlogs\\xauditlogs\\" + logfile,
//       function (err) {
//         if (err) throw err;
//         resolve("file has been renamed :" + logfile);
//       }
//     );
//   });
// };
