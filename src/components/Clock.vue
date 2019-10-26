<template>

  <div id="clock">{{ currentTime }}</div>

</template>

<script>
export default {
  name: 'Clock',
  data () {
    return {
      currentTime: '',
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.time();
      setInterval(this.time, 15 * this.$seconds);
    },
    time () {
      var now = new Date();
      var hour = now.getHours();
      if (hour > 12) {
        hour -= 12;
      }
      var minute = now.getMinutes();
      if (minute < 10) minute = '0' + minute;

      this.currentTime = hour + ':' + minute;
    },
  }
}
</script>

<style lang="scss">

#clock {
  display: flex;
  justify-content: center;
  font-size: 300px;
  line-height: 300px;
  font-weight: 700;
  width: 100%;
}

</style>
