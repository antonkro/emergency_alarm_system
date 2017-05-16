const express = require('express'),
  app = express(),
  server = require('http').Server(app),
  WebSocketServer = require('ws').Server,
  https = require('https');
  fs = require('fs');


// app enviroment ======================================================================
var argv = require('argv');
var args = argv.run();
var cfenv = require('cfenv');



// var PeerConnection = require('rtcpeerconnection');
// var p = new PeerConnection({server}, {});
var appEnv = cfenv.getAppEnv();
appEnv.port = args.targets[0];
// configure app ======================================================================
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// app.set('peer',p);

//ssl
const pkey = fs.readFileSync('./ssl/key.pem'),
  pcert = fs.readFileSync('./ssl/cert.pem'),
  options = { key: pkey, cert: pcert, passphrase: 'hsreutlingen' };
var wss = null, sslSrv = null;


//ressources ======================================================================
app.use(express.static(__dirname + '/views/ressources'));

// internal modules ======================================================================
require(__dirname + '/routes.js')(app, appEnv);
require(__dirname + '/events.js')(app);
require(__dirname + '/webrtc.js')(app);


// start server (listen on port 443 - SSL)
sslSrv = https.createServer(options, app).listen(443);
console.log("The HTTPS server is up and running");

// create the WebSocket server
wss = new WebSocketServer({ server: sslSrv });
console.log("WebSocket Secure server is up and running.");

/** successful connection */
wss.on('connection', function (client) {
  console.log("A new WebSocket client was connected.");
  /** incomming message */
  client.on('message', function (message) {
    /** broadcast message to all clients */
    wss.broadcast(message, client);
  });
});
// broadcasting the message to all WebSocket clients.
wss.broadcast = function (data, exclude) {
  var i = 0, n = this.clients ? this.clients.length : 0, client = null;
  if (n < 1) return;
  console.log("Broadcasting message to all " + n + " WebSocket clients.");
  for (; i < n; i++) {
    client = this.clients[i];
    // don't send the message to the sender...
    if (client === exclude) continue;
    if (client.readyState === client.OPEN) client.send(data);
    else console.error('Error: the client state is ' + client.readyState);
  }
};


// sslSrv.listen(appEnv.port, appEnv.bind, ,function () {
//   console.log("server started on " + appEnv.bind + " on port: " + appEnv.port)
// })