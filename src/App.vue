<template>
  <div id="app">

    <Clock />

    <div class="row second-row">
      <Weather ref="weather" />
    </div>

  </div>
</template>

<script>
import Clock from './components/Clock.vue'
import Weather from './components/Weather.vue'

export default {
  name: 'app',
  components: {
    Clock,
    Weather
  },
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
