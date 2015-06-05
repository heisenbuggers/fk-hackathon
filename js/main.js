var MAX = function(a,b) { return a>b?a:b; };
var MIN = function(a,b) { return a<b?a:b; };

var PRINTF = function(o, msg, val) {
  if(val)
  o.innerHTML += msg + ' = ' + val.toString() + '<br/>';
};

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

gyro.frequency = 10;

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
  var zdiv = document.getElementById('zs');

  var max = { x: 0, y: 0, z: 0 };
  var min = { x: Infinity, y: Infinity, z: Infinity };
  // var zs = [];
  var chartContext;

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

  $('#timeline').highcharts({
    chart: {
      zoomType: 'x',
      events: { load: function() { chartContext = this; } }
    },
    series: [{
      type: 'area',
      data: [0]
    }]
  });

  gyro.startTracking(function(o) {

    // find max
    max.x = MAX(max.x, o.x);
    max.y = MAX(max.y, o.y);
    max.z = MAX(max.z, o.z);

    min.x = MIN(min.x, o.x);
    min.y = MIN(min.y, o.y);
    min.z = MIN(min.z, o.z);

    // zs.push(o.z);
    if (startstop.data('status') === 'running')
      chartContext.series[0].addPoint(o.z);

  	if(Math.abs(o.z) > 0 && Math.abs(o.z) < 1.5){
  		   captureImage();
  	}

    meter.innerHTML = "";
    // PRINTF(meter, 'alpha', o.alpha);
    // PRINTF(meter, 'beta', o.beta);
    // PRINTF(meter, 'gamma', o.gamma);

    // PRINTF(meter, 'max x', max.x);
    // PRINTF(meter, 'max y', max.y);
    // PRINTF(meter, 'max z', max.z);

    // PRINTF(meter, 'min x', min.x);
    // PRINTF(meter, 'min y', min.y);
    // PRINTF(meter, 'min z', min.z);
    PRINTF(meter,'z',Math.abs(o.z));
    PRINTF(meter,'y',Math.abs(o.y));
    PRINTF(meter,'x',Math.abs(o.x));



  });

});
