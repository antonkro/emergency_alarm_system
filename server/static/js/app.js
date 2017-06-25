var selfEasyrtcid = "";

// var callerVideo = document.getElementById("callerVideo");
// var loader = document.getElementById("loader");
// var buttonImage = document.getElementById("buttonImage");

$(document).ready(function () {

    $('#loader').hide();
    $('#callerVideo').hide();
    $('#message').hide();

    $("#btn").click(function () {
        connect();

        $('#btn').hide();
        $('#loader').show();

    });

    function connect() {

        easyrtc.setPeerListener();
        easyrtc.setVideoDims(480, 480);

        easyrtc.setRoomOccupantListener(sendData);

        easyrtc.easyApp("easyrtc.audioVideoSimple", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
        // easyrtc.connect("easyrtc.myApp",loginSuccess, loginFailure);
    }

    function loginSuccess(easyrtcid) {
        selfEasyrtcid = easyrtcid;
        console.log("I am " + easyrtcid);
    }


    function loginFailure(errorCode, message) {
        easyrtc.showError(errorCode, message);
        $('#btn').show();
    }

    function mergeAllData(personenDaten, notfallkontakt, location) {
        var alldata = '{"person" : ' + personenDaten +
            ', "contact" : ' + notfallkontakt +
            ', "location" : ' + location +
            '}';

        return alldata;
    }

    function sendData(roomName, occupants, isPrimary) {
        getLocation(occupants, android.getMyPosition(), 0);
    }

    function sendStuff(occupants, location) {
        var data = mergeAllData(android.getPersonenDaten(), android.getNotfallKontakt(), location);
        for (var easyrtcid in occupants) {
            easyrtc.sendDataWS(easyrtcid, "message", data);
        }
    }

    function getLocation(occupants, location, count) {
        var tries = 12;
        console.log("retrieve Location tries: " + count);

        setTimeout(function () {
            if (count == 0) {
                sendStuff(occupants, location);
            }

            if (location == "{}") {
                if (count == 0) {
                    $("#message").css("color", "red");
                    $('#message').show();
                }
            }

            else {
                count = tries;
                $('#loader').hide();
                $('#message').html("Verbunden!");
                $('#message').show();
                $("#message").css("color", "greenyellow");
                sendStuff(occupants, location);
            }

            if (location == "{}" && count < tries) {
                getLocation(occupants, location, count + 1);
            }

            if (location == "{}" && count > tries) {
                $('#loader').hide();
                $("#message").css("color", "red");
                $('#message').html("Der GPS Standort konnte nicht ermittelt werden!!!");
            }

        }, 5000);
    }
});