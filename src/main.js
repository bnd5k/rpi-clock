import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return  moment(value).format('h:mm a');
  }
});

Vue.prototype.$seconds = 1000;
Vue.prototype.$minutes = 60 * 1000;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
