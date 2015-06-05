navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

var constraints = {
  video: {
    mandatory: {
      maxWidth: 300,
      maxHeight: 300	
    }
  }
};

var video = document.getElementById('video');

navigator.getUserMedia(constraints, success, error);

function success(stream){
    if (video.mozSrcObject !== undefined) {
        video.mozSrcObject = stream;
    } else {
        video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
    }
    video.play();
}

function error(err){
	console.log('Error' + error);
}

