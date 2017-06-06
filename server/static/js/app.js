function connect() {
    easyrtc.setPeerListener();
    easyrtc.setRoomOccupantListener(sendData);
    easyrtc.connect("easyrtc.instantMessaging", loginSuccess, loginFailure);
}

function loginSuccess(easyrtcid) {
    selfEasyrtcid = easyrtcid;
    console.log("I am " + easyrtcid);
}


function loginFailure(errorCode, message) {
    easyrtc.showError(errorCode, message);
}

function sendData(roomName, occupants, isPrimary){
    var personenDaten = "test";
    for (var easyrtcid in occupants){
        easyrtc.sendDataWS(easyrtcid, "message", personenDaten);
    }
}