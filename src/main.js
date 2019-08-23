import Vue from 'vue';
import App from './App.vue';

import localvue_comp from './index';
console.log(localvue_comp);
Vue.use(localvue_comp);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
