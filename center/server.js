const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);


// Configuration ======================================================================
//
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// internal modules ======================================================================
require(__dirname + '/routes.js')(app);


//ressources ======================================================================
app.use(express.static(__dirname + '/views/css'));
app.use(express.static(__dirname + '/views/js'));
app.use(express.static(__dirname + '/views'));


io.sockets.on('connection', function (socket) {
    console.log('socket connected');

    socket.on('disconnect', function () {
        console.log('socket disconnected');
    });
    socket.on('data', function (data) {
        console.log("DATA: " +data);
        io.sockets.emit('data', data);
    })
    // socket.emit('text', 'wow. such event. very real time.');
});

server.listen(3000, function () {
    console.log("Server started on Port 3000")
});