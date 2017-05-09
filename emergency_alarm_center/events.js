module.exports = function (app) {




app.on('peer', function (req, res) {
var Peer = require('simple-peer')
var p = new Peer({ initiator: location.hash === '#1', trickle: false })
 
p.on('error', function (err) { console.log('error', err) })
 
// p.on('signal', function (data) {
//   console.log('SIGNAL', JSON.stringify(data))
//   document.querySelector('#outgoing').textContent = JSON.stringify(data)
// })
 
// document.querySelector('form').addEventListener('submit', function (ev) {
//   ev.preventDefault()
//   p.signal(JSON.parse(document.querySelector('#incoming').value))
// })
 
p.on('connect', function () {
  console.log('CONNECT')
  p.send('whatever' + Math.random())
})
 
p.on('data', function (data) {
  console.log('data: ' + data)
})



/*
var pc = new webkitRTCPeerConnection(servers,
  {optional: [{RtpDataChannels: true}]});

pc.ondatachannel = function(event) {
  receiveChannel = event.channel;
  receiveChannel.onmessage = function(event){
    document.querySelector("div#receive").innerHTML = event.data;
  };
};

sendChannel = pc.createDataChannel("sendDataChannel", {reliable: false});

document.querySelector("button#send").onclick = function (){
  var data = document.querySelector("textarea#send").value;
  sendChannel.send(data);
};



*/
});




}