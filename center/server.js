const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    p2p = require('socket.io-p2p-server').Server;

// configuration ==================================================================
//
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
io.use(p2p);
// internal modules ===============================================================
require(__dirname + '/routes.js')(app);
require(__dirname + '/socketio.js')(io,p2p);

// internal ressources =====================================================================
app.use(express.static(__dirname + '/views/css'));
app.use(express.static(__dirname + '/views/js'));
app.use(express.static(__dirname + '/views/js/libs'));
app.use(express.static(__dirname + '/views'));



// server startup=====================================================================
server.listen(3000, function () {
    console.log("Server started on Port 3000")
});