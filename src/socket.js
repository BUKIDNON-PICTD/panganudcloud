module.exports = function (io) {

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

            if (clientinfo) {
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
}