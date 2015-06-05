var MAX = function(a,b) { return a>b?a:b; };
var MIN = function(a,b) { return a<b?a:b; };

var PRINTF = function(o, msg, val) {
  if(val)
  o.innerHTML += msg + ' = ' + val.toString() + '<br/>';
};

gyro.frequency = 100;

window.addEventListener('DOMContentLoaded', function() {
  // var meter = document.getElementById('meter');
  // var zdiv = document.getElementById('zs');


  // var max = { x: 0, y: 0, z: 0 };
  // var min = { x: Infinity, y: Infinity, z: Infinity };
  // // var zs = [];
  // var chartContext;

  // var startstop = $('#startstop');
  // startstop.on('click', function(e) {
  //   if(startstop.data('status') === 'running') {
  //     startstop.data('status', 'stopped');
  //     startstop.html('Start');
  //   }
  //   else {
  //     startstop.data('status', 'running');
  //     startstop.html('Stop');
  //   }
  // });

  // $('#timeline').highcharts({
  //   chart: {
  //     zoomType: 'x',
  //     events: { load: function() { chartContext = this; } }
  //   },
  //   series: [{
  //     type: 'area',
  //     data: [0,0,0]
  //   }]
  // });

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

  // gyro.startTracking(function(o) {

  //   // find max
  //   max.x = MAX(max.x, o.x);
  //   max.y = MAX(max.y, o.y);
  //   max.z = MAX(max.z, o.z);

  //   min.x = MIN(min.x, o.x);
  //   min.y = MIN(min.y, o.y);
  //   min.z = MIN(min.z, o.z);

  //   // zs.push(o.z);
  //   if (startstop.data('status') === 'running')
  //     chartContext.series[0].addPoint(o.z);

  // 	if(o.z > 0 && o.z < 1 && startstop.data('status') === 'running'){
  // 		captureImage();
  // 	}

  //   meter.innerHTML = "";
  //   // PRINTF(meter, 'alpha', o.alpha);
  //   // PRINTF(meter, 'beta', o.beta);
  //   // PRINTF(meter, 'gamma', o.gamma);

  //   // PRINTF(meter, 'max x', max.x);
  //   // PRINTF(meter, 'max y', max.y);
  //   // PRINTF(meter, 'max z', max.z);

  //   // PRINTF(meter, 'min x', min.x);
  //   // PRINTF(meter, 'min y', min.y);
  //   // PRINTF(meter, 'min z', min.z);

  // });

});
