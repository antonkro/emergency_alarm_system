

window.addEventListener("load", function (evt) {
  navigator.getUserMedia({ audio: true, video: true },
    function (stream) {
      var video = document.getElementById('localVideo');
      video.src = window.URL.createObjectURL(stream);
    },
    function (err) {
      console.log("The following error occurred: " + err.name);
    }
  );
});