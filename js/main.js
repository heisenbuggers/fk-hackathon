var MAX = function(a,b) { return a>b?a:b; };

var PRINTF = function(o, msg, val) { o.innerHTML += msg + ' = ' + val.toString() + '<br/>'; };

window.addEventListener('DOMContentLoaded', function() {
  var meter = document.getElementById('meter');

  var fallingDown = false;

  var max = { x: 0, y: 0, z: 0 };

  gyro.startTracking(function(o) {

    if(o.alpha && o.alpha > 180){
      fallingDown = true;
      console.log(o.alpha);
    }

    // find max
    max.x = MAX(max.x, o.x);
    max.y = MAX(max.y, o.y);
    max.z = MAX(max.z, o.z);

    meter.innerHTML = "";
    PRINTF(meter, 'alpha', o.alpha);
    PRINTF(meter, 'beta', o.beta);
    PRINTF(meter, 'gamma', o.gamma);

    PRINTF(meter, 'max x', max.x);
    PRINTF(meter, 'max y', max.y);
    PRINTF(meter, 'max z', max.z);

  });
});
