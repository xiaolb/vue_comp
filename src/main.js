import Vue from 'vue';
import App from './App.vue';
import router from './show/router';

import localvue_comp from './index';
console.log(localvue_comp);
Vue.use(localvue_comp);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});
