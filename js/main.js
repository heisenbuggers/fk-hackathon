window.addEventListener('DOMContentLoaded', function() {
  var meter = document.getElementById('meter');

  var fallingDown = false;

  gyro.startTracking(function(o) {


  	if(o.alpha && o.alpha > 180){
  		fallingDown = true;
  		console.log(o.alpha);
  	}

    meter.innerHTML = "";
    meter.innerHTML += 'alpha = ' + o.alpha + '<br/>';
    meter.innerHTML += 'beta = ' + o.beta + '<br/>';
    meter.innerHTML += 'gamma = ' + o.gamma + '<br/>';
    meter.innerHTML += '(x,y,z) = ' + o.x + ' ' + o.y + ' ' + o.z;
  });
});
