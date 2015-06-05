navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

var constraints = {
  video: {
    mandatory: {
      maxWidth: 600,
      maxHeight: 400
    }
  }
};

var video = document.getElementById('video');
var canvas = document.getElementById('imgCanvas');
var ctx = canvas.getContext('2d');

function captureImage(){
  if (videoAvailable) {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  };
}

navigator.getUserMedia(constraints, success, error);

function success(stream){
    videoAvailable = true;
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

