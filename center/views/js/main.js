var incoming = document.getElementById("incoming");
var socket = null;
$(document).ready(function () {
    socket = io.connect("http://192.168.0.26:3000");
    socket.on('connect', function () {

        socket.on('data', function (data) {
            $("#incoming").text(data);
        });
    });
});