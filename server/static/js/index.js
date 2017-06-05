
// var $ = require('jquery');

// $(document).ready(function () {



function init() {
//     var incoming = document.getElementById("incoming");
//     var privateButton = document.getElementById('private');
//     var upgradeMsg = document.getElementById('upgrade-msg');
//
//     var socket = io()
//     var opts = {peerOpts: {trickle: false}, autoUpgrade: false}
//     var p2p = new P2P(socket, opts, function () {
//         privateButton.disabled = false
//         p2p.emit('peer-obj', 'Hello there. I am ' + p2p.peerId)
//     })
//
//
//     privateButton.addEventListener('click', function (e) {
//         goPrivate()
//         p2p.emit('go-private', true)
//     })
//
//     p2p.on('go-private', function () {
//         goPrivate()
//     })
//
//     function goPrivate() {
//         p2p.useSockets = false
//         upgradeMsg.innerHTML = 'WebRTC connection established!'
//         privateButton.disabled = true
//     }
//
//     console.log("HEERE");
//
//     // socket = io.connect("http://localhost:3000");
//     // socket.on('connect', function () {
//
//     // socket.on('data', function (data) {
//     //     console.log(data);
//     //     $("#incoming").text(data);
//     // });
//
//     /*p2p.on('ready', function () {
//      p2p.usePeerConnection = true;
//      p2p.emit('peer-obj', {peerId: peerId});
//      })*/
//
// // this event will be triggered over the socket transport
// // until `usePeerConnection` is set to `true`
//     p2p.on('data', function (data) {
//         console.log(data);
//         $("#incoming").text(data);
//     });
}
document.addEventListener('DOMContentLoaded', init, false);
