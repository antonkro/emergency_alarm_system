// Load required modules
const fs = require("fs");
var http = require("https");              // http server core module
var express = require("express");           // web framework external module
var serveStatic = require('serve-static');  // serve static files
var socketIo = require("socket.io");        // web socket external module
var easyrtc = require("easyrtc");               // EasyRTC external module

// This line is from the Node.js HTTPS documentation.
var options = {
    key: fs.readFileSync('certs/privkey.pem'),
    cert: fs.readFileSync('certs/cert.pem')
};
// require(__dirname + '/ice.js')(easyrtc);


// var myIceServers = [
//     {"url": "stun:[ADDRESS]:[PORT]"},
//     {
//         "url": "85.214.197.55:3478",
//
//     },
//     {
//
//         "url" : "turn:85.214.197.55:3478?transport=tcp",
//         // "username": "[USERNAME]",
//         // "credential": "[CREDENTIAL]"
//     }
// ];
// easyrtc.setOption("appIceServers", myIceServers);
//
// easyrtc.on("getIceConfig", function(connectionObj, callback){
//     var myIceServers=[
//         {"url":"stun:85.214.197.55:3478"},
//         {
//             "url":        "turn:85.214.197.55:3478",
//             // "username":   connectionObj.getUsername(),
//             // "credential": "345yRTC!"
//         }
//     ];
//
//     callback(null, myIceServers);
// });

// Set process name
process.title = "node-easyrtc";

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var app = express();
app.use(serveStatic('static', {'index': ['index.html']}));

// Start Express http server on port 8080
var webServer = http.createServer(options, app);
webServer.listen(443);
// Start Socket.io so it attaches itself to Express server
var socketServer = socketIo.listen(webServer, {"log level": 1});

easyrtc.setOption("logLevel", "debug");

// Overriding the default easyrtcAuth listener, only so we can directly access its callback
easyrtc.events.on("easyrtcAuth", function (socket, easyrtcid, msg, socketCallback, callback) {
    easyrtc.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, function (err, connectionObj) {
        if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
            callback(err, connectionObj);
            return;
        }

        connectionObj.setField("credential", msg.msgData.credential, {"isShared": false});

        console.log("[" + easyrtcid + "] Credential saved!", connectionObj.getFieldValueSync("credential"));

        callback(err, connectionObj);
    });
});

// To test, lets print the credential to the console for every room join!
easyrtc.events.on("roomJoin", function (connectionObj, roomName, roomParameter, callback) {
    console.log("[" + connectionObj.getEasyrtcid() + "] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
    easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
});

// Start EasyRTC server
var rtc = easyrtc.listen(app, socketServer, null, function (err, rtcRef) {
    console.log("Initiated");

    rtcRef.events.on("roomCreate", function (appObj, creatorConnectionObj, roomName, roomOptions, callback) {
        console.log("roomCreate fired! Trying to create: " + roomName);

        appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
    });
});

//listen on port 8080
webServer.listen(8080, function () {
    console.log('listening on http://localhost:8080');
});
