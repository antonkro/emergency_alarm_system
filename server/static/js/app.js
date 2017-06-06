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

function mergAllData(personenDaten, notfallkontakt, location){
   var alldata = "{'person':"+personenDaten + ", 'contact': " + notfallkontakt + ", 'location: '"+location+ "}";
   
    return alldata;
}

function sendData(roomName, occupants, isPrimary){
    //var personenDaten = android.getPersonenDaten();
    //var kontaktdaten = android.getNotfallKontakt();

    var location = "{lat:'48.77930', lng:'9.10717'}";
    var data = mergAllData(android.getPersonenDaten(), android.getNotfallKontakt(), location)
    for (var easyrtcid in occupants){
        easyrtc.sendDataWS(easyrtcid, "message", data );
    }
}