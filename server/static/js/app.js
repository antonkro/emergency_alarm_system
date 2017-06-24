var selfEasyrtcid = "";

var callerVideo = document.getElementById("callerVideo");
callerVideo.style.display = 'none';


function connect() {

    easyrtc.setPeerListener();
    easyrtc.setVideoDims(640,480);

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
}

function mergeAllData(personenDaten, notfallkontakt, location){
   var alldata = '{"person" : '+personenDaten +
       ', "contact" : ' + notfallkontakt +
       ', "location" : '+location+
       '}';

    return alldata;
}

function sendData(roomName, occupants, isPrimary){
    //var personenDaten = android.getPersonenDaten();
    //var kontaktdaten = android.getNotfallKontakt();

    //var location = '{"lat":"48.77930", "lng":"9.10717"}';

    var data = mergeAllData(android.getPersonenDaten(), android.getNotfallKontakt(),  android.getMyPosition());
    for (var easyrtcid in occupants){
        easyrtc.sendDataWS(easyrtcid, "message", data );
    }
}