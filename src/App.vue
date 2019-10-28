<template>
  <div id="app">

    <Clock />

    <div class="row second-row">

        <TrafficLight ref="trafficLight" v-if="trafficLightVisible"/>

        <Weather ref="weather" v-if="weatherVisible" />

    </div>

  </div>
</template>

<script>
import Clock from './components/Clock.vue'
import TrafficLight from './components/TrafficLight.vue'
import Weather from './components/Weather.vue'

export default {
  name: 'app',
  components: {
    Clock,
    TrafficLight,
    Weather
  },
  data () {
    return {
      trafficLightVisible: false,
      weatherVisible: false,
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.manageTrafficAndWeather();
      setInterval(this.manageTrafficAndWeather, 2 * this.$minutes);
    },
    manageTrafficAndWeather () {
      // Traffic light should be on from 7:00 pm - 7:00 am

       var now = new Date();
       var hour = now.getHours();

       if (hour < 7 || hour > 17) {
         this.ensureTrafficLightOn();
         this.ensureWeatherOff();
       } else {
         this.ensureTrafficLightOff();
         this.ensureWeatherOn();
       }
    },
    ensureTrafficLightOn () {
      this.trafficLightVisible = true;
    },
    ensureTrafficLightOff () {
      this.trafficLightVisible = false;
    },
    ensureWeatherOn () {
      this.weatherVisible = true;
    },
    ensureWeatherOff () {
      this.weatherVisible = false;
    }
  }
}
</script>

<style lang="scss">

@import url(http://fonts.googleapis.com/css?family=Ubuntu);
@import url(http://fonts.googleapis.com/css?family=Lato:400,700);

/* General CSS */

body {
  font-family: 'Lato', sans-serif;
  max-width: 800px;
  max-height: 480px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  color: white;
}

.row {
  display: flex;
  width: 100%;
}

.visible {
  display: flex !important;
}

.hidden {
  display: none !important;
}

</style>
