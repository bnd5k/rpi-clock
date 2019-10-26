<template>

  <div id="traffic-light">
    <div class="circle red"></div>
    <div class="circle yellow"></div>
    <div class="circle green"></div>
  </div>

</template>

<script>
export default {
  name: 'TrafficLight',
  data () {
    return {
    }
  },
  mounted () {
    this.manageTrafficLight();
  },
  methods: {
    manageTrafficLight() {
      var now = new Date();
      var hour = now.getHours();

      if (hour === 6) {
        this.manageWakeUp(now);
      } else if (hour === 19) {
        this.manageBedtime(now);
       } else  {
        // covers edge case where clock is plugged in after bedtime
        this.turnLightOn('red');
      }
    },
    turnLightOn(lightColor) {
      var light = document.getElementsByClassName(lightColor)[0];

      if (light) {
        var litLight = document.getElementsByClassName('on')[0];
        if (litLight) {
          litLight.classList.remove("on");
        }

        light.classList.add("on");
      }
    },
    manageBedtime(currentTime) {
      // if time is before 6:30 PM, is should be green
      // if time is after 6:30 PM and before 6:25am, it should be red

      var currentMinutes = currentTime.getMinutes();

      if (currentMinutes < 25) {
        this.turnLightOn('green');
      } else if  (currentMinutes >= 25 && currentMinutes < 30){
        this.turnLightOn('yellow');
      } else if (currentMinutes >= 30) {
        this.turnLightOn('red');
      }
    },
    manageWakeUp(currentTime) {
      // if time is after 6:25 but before 6:30, it should be yellow
      // if time is after 6:30, it should be green

      var currentMinutes = currentTime.getMinutes();

      if  (currentMinutes >= 25 && currentMinutes < 30){
        this.turnLightOn('yellow');
      } else if (currentMinutes >= 30) {
        this.turnLightOn('green');
      } else {
        this.turnLightOn('red');
      }
    },
  }
}
</script>

<style lang="scss">

#traffic-light {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: -20px;
}

.circle {
  height: 180px;
  width: 180px;
  border-radius: 50%;
  filter: brightness(30%);
}

.red {
  background-color: red;
  background-image: radial-gradient(brown, transparent);

  &.on {
    filter: brightness(100%);
  }
}

.yellow {
  background-color: yellow;
  background-image: radial-gradient(orange, transparent);

  &.on {
    filter: brightness(100%);
  }
}

.green {
  background-color: green;
  background-image: radial-gradient(lime, transparent);

  &.on{
    filter: brightness(150%);
    background-color: green;
  }
}

</style>
