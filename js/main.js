var MAX = function(a,b) { return a>b?a:b; };
var MIN = function(a,b) { return a<b?a:b; };

var PRINTF = function(o, msg, val) {
  if(val)
  o.innerHTML += msg + ' = ' + val.toString() + '<br/>';
};

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

function getMediaSuccess(stream){
  videoAvailable = true;
  if (video.mozSrcObject !== undefined) {
      video.mozSrcObject = stream;
  } else {
      video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
  }
  video.play();
}

function getMediaError(err){
	console.log('Error' + error);
}

function captureImage(){
  if (videoAvailable) {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  };
}

var startstop;
var chartContext;
var video, canvas, ctx;

function stopThing() {
  startstop.data('status', 'stopped');
  startstop.html('Start');
}
function startThing() {
  startstop.data('status', 'running');
  startstop.html('Stop');
}

$(function() {
  var meter = document.getElementById('meter');

  gyro.frequency = 1;

  startstop = $('#startstop');

  var count = 1;

  video = document.getElementById('video');
  canvas = document.getElementById('imgCanvas');
  ctx = canvas.getContext('2d');

  setTimeout(function() {
    navigator.getUserMedia({video: true}, getMediaSuccess, getMediaError);
  }, 1000);

  startstop.on('click', function(e) {
    if(startstop.data('status') === 'running') stopThing();
    else startThing();
  });

  gyro.startTracking(function(o) {

    if(startstop.data('status') === 'running') {
      if(Math.abs(o.z) > 0 && Math.abs(o.z) < 1.5) {
  		  captureImage();
        meter.innerHTML = "";
        PRINTF(meter,'z', o.z);
        PRINTF(meter,'y', o.y);
        PRINTF(meter,'x', o.x);
        setTimeout(function() {
          stopThing();
        }, 100);
      }
    }

  });

});
