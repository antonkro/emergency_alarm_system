module.exports = function (io, p2p) {
    var _ = require('lodash-node');
    var users = [];
    var roomName = "dataRoom";
    var clients = [];
    var room;


    // data ===============================================================
    // io.sockets.on('connection', function (socket) {
    //     console.log('socket connected');
    //     // socket.on('disconnect', function () {
    //     console.log('socket disconnected');
    // });
    // socket.on('data', function (data) {
    //     console.log("DATA: " + data);
    //     io.sockets.emit('data', data);
    // })

    io.on('connection', function (socket) {
            // clients[socket.id] = socket;
            // socket.join(roomName);
            // p2p(socket, null, room);
        socket.on('go-private', function (data) {
            socket.broadcast.emit('go-private', data)
        })


        socket.on('data', function (data) {
            console.log('Message from peer: %s', data)
            socket.broadcast.emit('data', data)
        })




        // video==============================================================
        });
}