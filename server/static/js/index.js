function init() {
    var person = document.getElementById("person");
    var contact = document.getElementById("contact");
    var map = document.getElementById("map");


    var person_nav = document.getElementById("person_nav");
    var contact_nav = document.getElementById("contact_nav");
    var map_nav = document.getElementById("map_nav");

    //Greeting line
    // setTimeout(disableGreeter(), 5000);

    person.style.display = 'none';
    contact.style.display = 'none';
    map.style.display = 'none';

    document.getElementById("person_nav").addEventListener("click", function () {
        person.style.display = 'block';
        contact.style.display = 'none';
        map.style.display = 'none';
        document.getElementById('person_nav').className = 'active';
        document.getElementById('contact_nav').className = '';
        document.getElementById('map_nav').className = '';

    });

    document.getElementById("contact_nav").addEventListener("click", function () {
        person.style.display = 'none';
        map.style.display = 'none';
        contact.style.display = 'block';
        document.getElementById('person_nav').className = '';
        document.getElementById('map_nav').className = '';
        document.getElementById('contact_nav').className = 'active';
    });

    document.getElementById("home_nav").addEventListener("click", function () {
        person.style.display = 'none';
        contact.style.display = 'none';
        map.style.display = 'none';
        document.getElementById('person_nav').className = '';
        document.getElementById('contact_nav').className = '';
        document.getElementById('map_nav').className = '';
    });

    document.getElementById("map_nav").addEventListener("click", function () {
        person.style.display = 'none';
        contact.style.display = 'none';
        map.style.display = 'block';
        document.getElementById('person_nav').className = '';
        document.getElementById('contact_nav').className = '';
        document.getElementById('map_nav').className = 'active';
    });


    var selfEasyrtcid = "";
    connect();

}
document.addEventListener('DOMContentLoaded', init, false);

function initMap() {
    var uluru = {lat: 48.779301, lng: 9.1071757};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}


//easyrtc functions
function addToConversation(who, msgType, content) {
    // Escape html special characters, then add linefeeds.
    content = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    content = content.replace(/\n/g, '<br />');
    document.getElementById('conversation').innerHTML +=
        "<b>" + who + ":</b>&nbsp;" + content + "<br />";
}


function connect() {
    easyrtc.setPeerListener(addToConversation);
    easyrtc.setRoomOccupantListener(convertListToButtons);
    easyrtc.connect("easyrtc.instantMessaging", loginSuccess, loginFailure);
}

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
    addToConversation("Me", "message", text);
    document.getElementById('sendMessageText').value = "";
}


