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
	console.log('Error' + err);
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
var videoSelect;
var video, canvas, ctx;
var points = [];

var timeOfTravel = 0;

function stopThing() {
  startstop.data('status', 'stopped');
  startstop.html('Start');
  
}
function startThing() {
  startstop.data('status', 'running');
  startstop.html('Stop');
  points = [];
}
function getCamera() {
  navigator.getUserMedia({video: {
      optional:[{
        sourceId: $("#videoSource").val()
      }]
    }
  }, getMediaSuccess, getMediaError);
}

function gotSources(sourceInfos) {
  for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    var option = document.createElement('option');
    option.value = sourceInfo.id;
    if (sourceInfo.kind === 'video') {
      option.text = sourceInfo.label || 'camera ' + sourceInfo.id.substr(0, 5);
      videoSelect.append(option);
    }
  }
}

$(function() {
  meter = document.getElementById('meter');
  videoSelect = $('#videoSource');
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

  setTimeout(getCamera, 10);
  $(videoSelect).on('change', getCamera);

  startstop.on('click', function(e) {
    if(startstop.data('status') === 'running') stopThing();
    else {
      startThing();
    }
  });

  var isCapture = false;
  var startTime;
  var timeDiff = 0;


  window.addEventListener('devicemotion', function(event) {
    var e = event.accelerationIncludingGravity;
    var o = {};
    o.z = Math.sqrt(e.x*e.x + e.y*e.y + e.z*e.z);
    
    if(startstop.data('status') === 'running') {

      points.push(o.z);
      var l = points.length;

      if(!isCapture) {
        if (l > 9) {
          for(var i=l-1;i>l-9;i--) {
            isCapture = points[i] > 20;
          }
        }
      } else {
        if(!startTime) {
          if(Math.abs(o.z) < 3) startTime = Date.now();
        } else {
          console.log(startTime);
            if(Math.abs(o.z) > 3) {
            timeDiff = (Date.now() - startTime)/2000;
            PRINTF(meter, 'Height', (4.9*timeDiff*timeDiff).toFixed(3));
            startTime = undefined;
            isCapture = false;
            captureImage();
          }
        }
      }
      

    }
   

  });
});
