var fs = require("fs");
const dirTree = require("directory-tree");
path = require("path"),
    _ = require("underscore");
const express = require('express');
module.exports = function (app) {
   
    app.set("view engine", "ejs");
    app.set('views', './src/views');
    app.use("/scripts", express.static(__dirname + "../../node_modules/admin-lte/"));
    app.use("/spagenda", express.static(global.gConfig.spagendastorage));

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

        let root = dirTree(global.gConfig.spagendastorage);

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

}