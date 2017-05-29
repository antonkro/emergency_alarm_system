/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var P2P = require('socket.io-p2p');
var io = require('socket.io-client');

document.addEventListener('deviceready', function () {
    var outcoming = document.getElementById("outcoming");
    // var socket = io.connect("http://localhost:3000");
    var socket = io();
    var opts = {peerOpts: {trickle: false}, autoUpgrade: false}
    var p2p = new P2P(socket, opts, function () {
        p2p.emit('peer-obj', 'Hello there. I am ' + p2p.peerId)
    })


// this event will be triggered over the socket transport
// until `usePeerConnection` is set to `true`

    // data ========================================================



//     socket.on('connect', function () {
//
//         socket.on('text', function (text) {
//             alert(text);
//         });
//     });
//
    document.getElementById("btnSend").addEventListener("click", function () {
        console.log(outcoming.value.toString());
        p2p.emit('data', outcoming.value.toString());
        //         socket.emit('data',outcoming.value.toString());
    });


    // video =======================================================
    // var config = {
    //     isInitiator: true,
    //     turn: {
    //         host: 'stun:stun.l.google.com:19302',
    //         // username: 'test',
    //         // password: '123'
    //     },
    //     streams: {
    //         audio: true,
    //         video: false
    //     }
    // }
    //
    // var  center = "emergency_center";
    //
    // var session = new cordova.plugins.phonertc.Session(config);
    //
    //
    // session.on('sendMessage', function (data) {
    //     socket.center.emit(data);
    // });
    //
    // socket.onMessage = function (message) {
    //     session.receiveMessage(message);
    // };
    //
    // session.on('answer', function () {
    //     console.log('Other client answered!');
    // });
    //
    // session.on('disconnect', function () {
    //     console.log('Other client disconnected!');
    // });
    //
    // session.call();

});
