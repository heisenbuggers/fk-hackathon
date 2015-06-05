window.addEventListener('DOMContentLoaded', function() {
  var meter = document.getElementById('meter');

  gyro.startTracking(function(o) {
    meter.innerHTML = "";
    meter.innerHTML += 'alpha = ' + o.alpha + '<br/>';
    meter.innerHTML += 'beta = ' + o.beta + '<br/>';
    meter.innerHTML += 'gamma = ' + o.gamma + '<br/>';
    meter.innerHTML += '(x,y,z) = ' + o.x + ' ' + o.y + ' ' + o.z;
  });
});
