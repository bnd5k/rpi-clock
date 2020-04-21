<template>

  <div id="weather-info">

    <i class="conditions wi" :class="weatherIcon"></i>

    <div class="current-temp">
      <i class="wi wi-thermometer"></i>
      {{ currentTemp }}&deg;
    </div>

    <div class="sun">
      <div v-if="sunriseIsNext">
        <i class="wi wi-sunrise"></i>
          {{ sunrise | formatDate }}
      </div>

      <div v-else>
        <i class="wi wi-sunset"></i>
          {{ sunset | formatDate }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const weatherConditions = {
  '01d': 'wi-day-sunny',
  '01n': 'wi-night-clear',
  '02d': 'wi-day-sunny-overcast',
  '02n': 'wi-night-cloudy',
  '03d': 'wi-day-cloudy',
  '03n': 'wi-night-cloudy',
  '04d': 'wi-cloudy',
  '04n': 'wi-cloudy',
  '09d': 'wi-rain',
  '09n': 'wi-rain',
  '10d': 'wi-day-rain',
  '10n': 'wi-night-rain',
  '11d': 'wi-day-thunderstorm',
  '11n': 'wi-night-thunderstorm',
  '13d': 'wi-day-snow',
  '13n': 'wi-night-snow'
}

export default {
  name: 'Weather',
  data () {
    return {
      apiKey: process.env.VUE_APP_API_KEY,
      lat: process.env.VUE_APP_LAT,
      lon: process.env.VUE_APP_LON,
      units: 'imperial',
      errors: [],
      weatherIconCode: '',
      currentTemp: '',
      sunrise: '',
      sunset: '',
    }
  },
  computed: {
    weatherUrl () {
      return 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.lat + '&lon=' + this.lon + '&units=' + this.units + '&APPID=' + this.apiKey
    },
    weatherIcon () {
      return weatherConditions[this.weatherIconCode];
    },
    sunriseIsNext () {
      if (this.sunrise.length && Date.now() < this.sunrise) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.manageWeather();
      setInterval(this.manageWeather, 10 * this.$minutes);
    },
    manageWeather () {
      this.getCurrentWeather();
    },
    getCurrentWeather () {
      axios.get(this.weatherUrl)
      .then(response => {
        this.weatherIconCode = response.data.weather[0].icon;
        this.currentTemp =  response.data.main.temp;
        this.sunrise = response.data.sys.sunrise * 1000;
        this.sunset = response.data.sys.sunset * 1000;
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/weather-icons.css';

#weather-info {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  line-height: 180px; /* screen is 480px and clock at 300 px leaves 180 */
  font-size: 50pt;
}

.sun {
  display: flex;
  align-items: center;

  i {
    margin-right: 10px;
  }
}

</style>
