// I'd like to move away from jquery, so new code is in vanilla JS.

function turnLightOn(lightColor) {
  var light = document.getElementsByClassName(lightColor)[0];

  if (light) {
    var litLight = document.getElementsByClassName('on')[0];
    if (litLight) {
      litLight.classList.remove("on");
    }

    light.classList.add("on");
  }
}

function toggleWeather() {
  var trafficLight = document.getElementById('traffic-light');
  var weather = document.getElementById('weather-info');

  if (trafficLight.classList.contains('hidden')) {
    trafficLight.classList.remove('hidden');
    weather.classList.remove('visible');

    trafficLight.classList.add('visible')
    weather.classList.add('hidden');
  } else {
    trafficLight.classList.remove('visible');
    weather.classList.remove('hidden');

    trafficLight.classList.add('hidden')
    weather.classList.add('visible');
  }
}

function manageBedtime(currentTime) {
  // if time is before 6:30 PM, is should be green
  // if time is after 6:30 PM and before 6:25am, it should be red

  toggleWeather();

  var currentMinutes = currentTime.getMinutes();

  if (currentMinutes < 25) {
    turnLightOn('green');
  } else if  (currentMinutes >= 25 && currentMinutes < 30){
    turnLightOn('yellow');
  } else if (currentMinutes >= 30) {
    turnLightOn('red');
  }
}

function manageWakeUp(currentTime) {
  // if time is after 6:25 but before 6:30, it should be yellow
  // if time is after 6:30, it should be green

  toggleWeather();

  var currentMinutes = currentTime.getMinutes();

  if  (currentMinutes >= 25 && currentMinutes < 30){
    turnLightOn('yellow');
  } else if (currentMinutes >= 30) {
    turnLightOn('green');
  } else {
    turnLightOn('red');
  }
}

function ensureTrafficLightOn() {
  var trafficLight = document.getElementById('traffic-light');
  trafficLightVisible = trafficLight.classList.contains('visible');
  if (!trafficLightVisible) {
    toggleWeather();
    turnLightOn('red');
  }
}

function manageTrafficLight() {
  // Traffic light should be on from 7:00 pm - 7:00 am

  var now = new Date();
  var hour = now.getHours();
  var beforeMidnight = hour > 19 && hour <= 23;
  var beforeWakeup = hour > 0 && hour <= 5;

  if (hour === 6) {
    manageWakeUp(now);
  } else if (hour === 7) {
    toggleWeather();
  } else if (hour === 19) {
    manageBedtime(now);
  } else if (beforeMidnight || beforeWakeup) {
    // covers edge case where clock is plugged in after bedtime
    ensureTrafficLightOn();
  }
}

setInterval(manageTrafficLight, 1 * MINUTES);







// Helper functions for troubleshooting.
//  $('#weather-info').on('click', function() {
//   var now = new Date();
//   manageBedtime(now);
//  });

//  $('#traffic-light').on('click', function() {
//   var now = new Date();
//   manageWakeUp(now);
//  });