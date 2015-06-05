var MAX = function(a,b) { return a>b?a:b; };
var MIN = function(a,b) { return a<b?a:b; };

var PRINTF = function(o, msg, val) {
  if(val)
  o.innerHTML += msg + ' = ' + val.toString() + '<br/>';
};

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

function success(stream){
  videoAvailable = true;
  if (video.mozSrcObject !== undefined) {
      video.mozSrcObject = stream;
  } else {
      video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
  }
  console.log(video.play());
}

function captureImage(){
  if (videoAvailable) {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  };
}

function error(err){
	console.log('Error' + error);
}

$(function() {
  var meter = document.getElementById('meter');
  var chartContext;

  gyro.frequency = 1;

  var startstop = $('#startstop');
  var count = 1;

  video = document.getElementById('video');
  canvas = document.getElementById('imgCanvas');
  ctx = canvas.getContext('2d');

  setTimeout(function() {
    navigator.getUserMedia({video: true}, success, error);
  }, 1000);

  startstop.on('click', function(e) {
    if(startstop.data('status') === 'running') {
      startstop.data('status', 'stopped');
      startstop.html('Start');
    }
    else {
      startstop.data('status', 'running');
      startstop.html('Stop');
    }
  });

  gyro.startTracking(function(o) {

    if(startstop.data('status') === 'running') {
      if(Math.abs(o.z) > 0 && Math.abs(o.z) < 1.5) {
  		  captureImage();
      }
    }

    // meter.innerHTML = "";
    // PRINTF(meter,'z',Math.abs(o.z));
    // PRINTF(meter,'y',Math.abs(o.y));
    // PRINTF(meter,'x',Math.abs(o.x));

  });

});
