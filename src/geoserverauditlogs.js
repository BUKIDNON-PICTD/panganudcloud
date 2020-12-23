var fs = require("fs");
const dirTree = require("directory-tree");
const xml2js = require('xml2js');
var auditlog = require('./models/geoserveraudit');
var SMB2 = require('smb2');
var smb2Client = new SMB2({
    share: '\\\\172.16.2.55\\geoserverdata',
    domain: '',
    username: 'admin',
    password: 'PGB*4dm1n!',
    // debug: 0,
    autoCloseTimeout: 0
});

exports.migrate = () => {
    // create an SMB2 instance
 
    // console.log(smb2Client);

    // let root = dirTree('//172.16.2.55/geoserverdata/auditlogs');
    // // let newArray = root.children.slice(0, 1);
    // console.log("TEST");
    // console.log(root);





    return new Promise((resolve, reject) => {
        // newArray.forEach(async (logfile,index,array) => {
        // for (const logfile of newArray) {
        var parser = new xml2js.Parser();
        // console.log(logfile.path);
        var auditlogs = [];
        smb2Client.readdir('auditlogs', async function (err, files) {
            if (err) throw err;
            var selectedfiles = files.slice(0, 25).map(i => {
                return i;
            });
            for (const logfile of selectedfiles) {
                smb2Client.readFile('auditlogs\\' + logfile, async function (err, data) {
                    if (err) throw err;
                    // console.log(data);
                    parser.parseString(data, async function (err, result) {
                        // console.dir(JSON.stringify(result.Requests));
                        try {
    
                            for (let req of result.Requests.Request) {
                                if (req) {
                                    var newlog = {
                                        id: req.$.id,
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
                                        Failed: req.Failed[0]
                                    }
                                    // console.log(newlog);
                                    // let log = await auditlog.create(newlog);
                                    // console.log(log.id);
                                    auditlogs.push(newlog);
    
                                }
                            }
                            await auditlog.bulkCreate(auditlogs).then(async () => { // Notice: There are no arguments here, as of right now you'll have to...
                                // await fs.rename(root.children[0].path, 'W:\\auditlogs\\xauditlogs' + root.children[0].name, function (err) {
                                //     if (err) throw err
                                //     console.log('Successfully renamed - AKA moved!')
                                // });
                                await smb2Client.rename('auditlogs\\' + logfile, 'auditlogs\\xauditlogs\\' + logfile,  function (err) {
                                    if (err) throw err;
                                    console.log("file has been renamed");
                                });
                                
                            }).then(logs => {
                                // console.log(logs) // ... in order to get the array of user objects
                            });
                        } catch (error) {
                            console.log("error on: " + logfile);
                            throw error;
                        }
                    });
                });
            }

            await resolve("Done");
           
        });

        // fs.readFile(root.children[0].path, async function (err, data) {
        //     parser.parseString(data, async function (err, result) {
        //         // console.dir(JSON.stringify(result.Requests));
        //         try {

        //             for (let req of result.Requests.Request) {
        //                 if (req) {
        //                     var newlog = {
        //                         id: req.$.id,
        //                         Service: req.Service[0],
        //                         Version: req.Version[0],
        //                         Operation: req.Operation[0],
        //                         SubOperation: req.SubOperation[0],
        //                         Resources: req.Resources[0],
        //                         ResourcesProcessingTime: req.ResourcesProcessingTime[0],
        //                         LabelsProcessingTime: req.LabelsProcessingTime[0],
        //                         Path: req.Path[0],
        //                         QueryString: req.QueryString[0],
        //                         Body: req.Body[0],
        //                         HttpMethod: req.HttpMethod[0],
        //                         StartTime: req.StartTime[0],
        //                         EndTime: req.EndTime[0],
        //                         TotalTime: req.TotalTime[0],
        //                         RemoteAddr: req.RemoteAddr[0],
        //                         RemoteHost: req.RemoteHost[0],
        //                         Host: req.Host[0],
        //                         RemoteUser: req.RemoteUser[0],
        //                         ResponseStatus: req.ResponseStatus[0],
        //                         ResponseLength: req.ResponseLength[0],
        //                         ResponseContentType: req.ResponseContentType[0],
        //                         CacheResult: req.CacheResult[0],
        //                         MissReason: req.MissReason[0],
        //                         Failed: req.Failed[0]
        //                     }
        //                     // console.log(newlog);
        //                     // let log = await auditlog.create(newlog);
        //                     // console.log(log.id);
        //                     auditlogs.push(newlog);

        //                 }
        //             }
        //             await auditlog.bulkCreate(auditlogs).then(async () => { // Notice: There are no arguments here, as of right now you'll have to...
        //                 await fs.rename(root.children[0].path, 'W:\\auditlogs\\xauditlogs' + root.children[0].name, function (err) {
        //                     if (err) throw err
        //                     console.log('Successfully renamed - AKA moved!')
        //                 });
        //                 await resolve("Done");
        //             }).then(logs => {
        //                 // console.log(logs) // ... in order to get the array of user objects
        //             });
        //         } catch (error) {
        //             throw error;
        //         }
        //     });
        // });


    });
}