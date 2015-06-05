var MAX = function(a,b) { return a>b?a:b; };
var MIN = function(a,b) { return a<b?a:b; };

var PRINTF = function(o, msg, val) {
  o.innerHTML += msg + ' = ' + val + '<br/>';
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
    canvas.width = 360;
    canvas.height = 200;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  };
}

var startstop;
var chartContext;
var meter;
var video, canvas, ctx;
var points = [];

var timeOfTravel = 0;

function stopThing() {
  startstop.data('status', 'stopped');
  startstop.html('Start');
  PRINTF(meter, 'points', points.join(', '));
  PRINTF(meter, 'time of travel', timeOfTravel);
}
function startThing() {
  startstop.data('status', 'running');
  startstop.html('Stop');
  points = [];
}

function gotSources(sourceInfos) {
  for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    var option = document.createElement('option');
    option.value = sourceInfo.id;
    if (sourceInfo.kind === 'audio') {
      option.text = sourceInfo.label || 'microphone ' +
        (audioSelect.length + 1);
      audioSelect.appendChild(option);
    } else if (sourceInfo.kind === 'video') {
      option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source: ', sourceInfo);
    }
  }
}

$(function() {
  meter = document.getElementById('meter');
  videoSelect = document.querySelector('select#videoSource');
  videoSource = videoSelect.value;

  gyro.frequency = 1;

  startstop = $('#startstop');

  var count = 1;

  video = document.getElementById('video');
  canvas = document.getElementById('imgCanvas');
  ctx = canvas.getContext('2d');

  if (typeof MediaStreamTrack === 'undefined' || typeof MediaStreamTrack.getSources === 'undefined') {
    alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
  } else {
    MediaStreamTrack.getSources(gotSources);
  }

  setTimeout(function() {
    navigator.getUserMedia({video: {
        optional:[{
          sourceId:videoSource
        }]
      }
    }, getMediaSuccess, getMediaError);
  }, 10);

  startstop.on('click', function(e) {
    if(startstop.data('status') === 'running') stopThing();
    else {
      startThing();
    }
  });

  window.addEventListener('devicemotion', function(event) {
    var o = event.accelerationIncludingGravity;
    o.z = o.z.toFixed(3);
    var startTime;

    if(startstop.data('status') === 'running') {

      points.push(o.z);
      var l = points.length;
      var isCapture = false;
      if (l > 6) {
        var lastValue = Math.abs(points[l-1]);
        for(var i=l-2;i>l-7;i--) {
          isCapture = lastValue === Math.abs(points[i]);
        }
      }

      if(Math.abs(o.z) < 1) if(!startTime) startTime = Date.now();
      else timeOfTravel = Date.now() - startTime;

      // if(Math.abs(o.z) < 2) {
      if(isCapture && o.z > 15) {
  		  captureImage();
        stopThing();
        PRINTF(meter, 'Capture point', count++);
        PRINTF(meter, 'z', o.z);
        PRINTF(meter, 'y', o.y);
        PRINTF(meter, 'x', o.x);
      }

    } else {
      timeOfTravel = Date.now() - startTime;
    }

  });

  // gyro.startTracking(function(o) {
  //
  // });

});
