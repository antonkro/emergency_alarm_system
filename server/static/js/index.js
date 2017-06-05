


function init() {
    var person = document.getElementById("person");
    var contact = document.getElementById("contact");

    var person_nav = document.getElementById("person_nav");
    var contact_nav = document.getElementById("contact_nav");

    //Greeting line
    // setTimeout(disableGreeter(), 5000);

    person.style.display = 'none';
    contact.style.display = 'none';

    document.getElementById("person_nav").addEventListener("click", function(){
        person.style.display = 'block';
        contact.style.display = 'none';
        document.getElementById('person_nav').className ='active';
        document.getElementById('contact_nav').className ='';

    });

    document.getElementById("contact_nav").addEventListener("click", function(){
        person.style.display = 'none';
        contact.style.display = 'block';
        document.getElementById('person_nav').className ='';
        document.getElementById('contact_nav').className ='active';
    });

    document.getElementById("home_nav").addEventListener("click", function(){
        person.style.display = 'none';
        contact.style.display = 'none';
        document.getElementById('person_nav').className ='';
        document.getElementById('contact_nav').className ='';
    });



}
document.addEventListener('DOMContentLoaded', init, false);

// function disableGreeter(){
//     document.getElementById("welcome").style.display='none';
// }