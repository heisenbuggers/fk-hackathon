var MAX = function(a,b) { return a>b?a:b; };
var MIN = function(a,b) { return a<b?a:b; };

var PRINTF = function(o, msg, val) { o.innerHTML += msg + ' = ' + val.toString() + '<br/>'; };

gyro.frequency = 10;

window.addEventListener('DOMContentLoaded', function() {
  var meter = document.getElementById('meter');
  var zdiv = document.getElementById('zs');

  var fallingDown = false;

  var max = { x: 0, y: 0, z: 0 };
  var min = { x: Infinity, y: Infinity, z: Infinity };
  var zs = [];

  gyro.startTracking(function(o) {

    if(o.alpha && o.alpha > 180){
      fallingDown = true;
      console.log(o.alpha);
    }

    // find max
    max.x = MAX(max.x, o.x);
    max.y = MAX(max.y, o.y);
    max.z = MAX(max.z, o.z);

    min.x = MIN(min.x, o.x);
    min.y = MIN(min.y, o.y);
    min.z = MIN(min.z, o.z);

    zs.push(o.z);

    if(o.z > 9) PRINTF(zdiv, 'z = ', o.z);

    meter.innerHTML = "";
    PRINTF(meter, 'alpha', o.alpha);
    PRINTF(meter, 'beta', o.beta);
    PRINTF(meter, 'gamma', o.gamma);

    PRINTF(meter, 'max x', max.x);
    PRINTF(meter, 'max y', max.y);
    PRINTF(meter, 'max z', max.z);

    PRINTF(meter, 'min x', min.x);
    PRINTF(meter, 'min y', min.y);
    PRINTF(meter, 'min z', min.z);

  });
});
