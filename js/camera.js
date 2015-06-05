navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;


var video = document.getElementById('video');
var canvas = document.getElementById('imgCanvas');
var ctx = canvas.getContext('2d');

function captureImage(){
  canvas.width = video.clientWidth;
  canvas.height = video.clientHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

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




var videoSelect = document.querySelector('select#videoSource');



function Sources(sourceInfos) {
  for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    var option = document.createElement('option');
    option.value = sourceInfo.id;
    if (sourceInfo.kind === 'video') {
      option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source: ', sourceInfo);
    }
  }
}







function start(){
  if (!!window.stream) {
    videoElement.src = null;
    window.stream.stop();
  }
  if (typeof MediaStreamTrack === 'undefined'){
    alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
  } else {
    MediaStreamTrack.getSources(Sources);
  }
  var videoSource = videoSelect.value;
  var constraints = {
    video: {
      optional: [{sourceId: videoSource}],
      mandatory: {
        maxWidth: 300,
        maxHeight: 300
      }
    }
  };

  navigator.getUserMedia(constraints, success, error);
}

videoSelect.onchange = start;

start();
