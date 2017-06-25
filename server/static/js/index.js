function init() {
    var person = document.getElementById("person");
    var contact = document.getElementById("contact");

    var person_nav = document.getElementById("person_nav");
    var contact_nav = document.getElementById("contact_nav");
    var map_nav = document.getElementById("map_nav");

    var person_surname = document.getElementById("person_surname");
    var person_name = document.getElementById("person_name");
    var person_history = document.getElementById("person_history");
    var person_bloodgroup = document.getElementById("person_bloodgroup");

    var contact_surname = document.getElementById("contact_surname");
    var contact_name = document.getElementById("contact_name");
    var contact_address = document.getElementById("contact_address");
    var contact_city = document.getElementById("contact_city");
    var contact_number = document.getElementById("contact_number");
    var client = null;
    var callBtn = document.getElementById("callBtn");
    var selfVideo = document.getElementById("selfVideo");
    var supendLocation = document.getElementById("supendLocation");

    callBtn.disabled = true;
    selfVideo.style.display = 'none';
    supendLocation.style.display = 'none';

    //Greeting line
    // setTimeout(disableGreeter(), 5000);

    // person.style.display = 'none';
    // contact.style.display = 'none';
    // map.style.display = 'none';
    //
    // document.getElementById("person_nav").addEventListener("click", function () {
    //     person.style.display = 'block';
    //     contact.style.display = 'none';
    //     map.style.display = 'none';
    //     document.getElementById('person_nav').className = 'active';
    //     document.getElementById('contact_nav').className = '';
    //     document.getElementById('map_nav').className = '';
    //
    // });
    //
    // document.getElementById("contact_nav").addEventListener("click", function () {
    //     person.style.display = 'none';
    //     map.style.display = 'none';
    //     contact.style.display = 'block';
    //     document.getElementById('person_nav').className = '';
    //     document.getElementById('map_nav').className = '';
    //     document.getElementById('contact_nav').className = 'active';
    // });
    //
    // document.getElementById("home_nav").addEventListener("click", function () {
    //     person.style.display = 'none';
    //     contact.style.display = 'none';
    //     map.style.display = 'none';
    //     document.getElementById('person_nav').className = '';
    //     document.getElementById('contact_nav').className = '';
    //     document.getElementById('map_nav').className = '';
    // });
    //
    // document.getElementById("map_nav").addEventListener("click", function () {
    //     person.style.display = 'none';
    //     contact.style.display = 'none';
    //     map.style.display = 'block';
    //     document.getElementById('person_nav').className = '';
    //     document.getElementById('contact_nav').className = '';
    //     document.getElementById('map_nav').className = 'active';
    //     google.maps.event.trigger(map, "resize");
    // });


    var selfEasyrtcid = "";
    connect();

}
// function test() {
//     var s = '{"person" : {"name":"Donat","surename":"Balasar","illness":"Keine","bloodgroup":"A"}, "contact" : {"name":"Peter","surename":"Rüdiger","street":"Kanonenweg 2","city":"Reutlingen","phone":"015789677854"}, "location" : {"lat":"48.77930", "lng":"9.10717"}}'
//     addData("", "", s);
//
// }


document.addEventListener('DOMContentLoaded', init, false);

//
function initMap(markerLocation) {
    var uluru = {lat: 48.779301, lng: 9.1071757};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    marker = new google.maps.Marker({
        position: markerLocation,
        map: map,
        title: 'Standort der Person im Notfall'

    });
}


//easyrtc functions
function marks(local) {
    local = {lat: parseFloat(local.lat), lng: parseFloat(local.lng)};
    initMap(local);
}


function addData(who, msgType, str) {
    // Escape html special characters, then add linefeeds.
    // content = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // content = content.replace(/\n/g, '<br />');
    client = who;
    callBtn.disabled = false;
    console.log("before parse: " + str);
    // str= str.replace("ü", "&uuml");
    // console.log("after parse: "+str);

    var data = JSON.parse(str);
    person_surname.innerHTML = data.person.surename.toString();
    person_name.innerHTML = data.person.name.toString();
    person_history.innerHTML = data.person.illness.toString();
    person_bloodgroup.innerHTML = data.person.bloodgroup.toString();

    contact_surname.innerHTML = data.contact.surename.toString();
    contact_name.innerHTML = data.contact.name.toString();
    contact_address.innerHTML = data.contact.street.toString();
    contact_city.innerHTML = data.contact.city.toString();
    contact_number.innerHTML = data.contact.phone.toString();
    if(data.location="{}"){
        supendLocation.style.display = 'block';
    }
    else{
        marks(data.location);
    }
    console.log(data.location);



    // document.getElementById('conversation').innerHTML +=
    //     "<b>" + who + ":</b>&nbsp;" + content + "<br />";
}


function connect() {
    easyrtc.setPeerListener(addData);
    // easyrtc.setRoomOccupantListener(convertListToButtons);
    easyrtc.setVideoDims(640,480);



    easyrtc.easyApp("easyrtc.audioVideoSimple", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
    // easyrtc.connect("easyrtc.myApp", loginSuccess, loginFailure);
    // easyrtc.connect("easyrtc.audioVideoSimple", ["callerVideo1"], loginSuccess, loginFailure);


    function loginSuccess(easyrtcid) {
        selfEasyrtcid = easyrtcid;
        console.log("I am " + easyrtcid);
    }


    function loginFailure(errorCode, message) {
        easyrtc.showError(errorCode, message);
    }

    function convertListToButtons(roomName, occupants, isPrimary) {
        var otherClientDiv = document.getElementById('otherClients');
        while (otherClientDiv.hasChildNodes()) {
            otherClientDiv.removeChild(otherClientDiv.lastChild);
        }

        for (var easyrtcid in occupants) {
            var button = document.createElement('button');
            button.onclick = function (easyrtcid) {
                return function () {
                    sendStuffWS(easyrtcid);
                };
            }(easyrtcid);
            var label = document.createTextNode("Send to " + easyrtc.idToName(easyrtcid));
            button.appendChild(label);

            otherClientDiv.appendChild(button);
        }
        if (!otherClientDiv.hasChildNodes()) {
            otherClientDiv.innerHTML = "<em>Nobody else logged in to talk to...</em>";
        }
    }

    function sendStuffWS(otherEasyrtcid) {
        var text = document.getElementById('sendMessageText').value;
        if (text.replace(/\s/g, "").length === 0) { // Don't send just whitespace
            return;
        }

        easyrtc.sendDataWS(otherEasyrtcid, "message", text);
        addData("Me", "message", text);
        document.getElementById('sendMessageText').value = "";
    }
}

function setUpMirror() {
    if( !haveSelfVideo) {
        var selfVideo = document.getElementById("selfVideo");
        easyrtc.setVideoObjectSrc(selfVideo, easyrtc.getLocalStream());
        selfVideo.muted = true;
        haveSelfVideo = true;
    }
}

function performCall() {
    var successCB = function () {
    };
    var failureCB = function () {
    };
    easyrtc.call(client, successCB, failureCB);
}


