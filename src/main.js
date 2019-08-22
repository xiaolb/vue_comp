import Vue from 'vue';
import App from './App.vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

import localvue_comp from './index';
console.log(localvue_comp);
Vue.use(localvue_comp);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
