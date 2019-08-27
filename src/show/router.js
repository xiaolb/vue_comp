import Vue from 'vue';
import VueRouter from 'vue-router';
// import form from './form.vue';

Vue.use(VueRouter);

// 把各个模块下的路由拼接起来，作为home下的子路由
var routes = [
    {
        path: '',
        redirect: '/listpage',
    },
    {
        path: '/listpage',
        name: 'listpage',
        component: resolve => {
            require(['./listpage.vue'], resolve);
        },
    },
    {
        path: '/search',
        name: 'search',
        component: resolve => {
            require(['./search.vue'], resolve);
        },
    },
    {
        path: '/table',
        name: 'table',
        component: resolve => {
            require(['./table.vue'], resolve);
        },
    },
    {
        path: '/form',
        name: 'form',
        component: resolve => {
            require(['./form.vue'], resolve);
        },
    },
    {
        path: '/modalform',
        name: 'modalform',
        component: resolve => {
            require(['./modalform.vue'], resolve);
        },
    },
    {
        path: '/upload',
        name: 'upload',
        component: resolve => {
            require(['./upload.vue'], resolve);
        },
    },
    {
        path: '/ueditor',
        name: 'ueditor',
        component: resolve => {
            require(['./ueditor.vue'], resolve);
        },
    },
    {
        path: '/qrcode',
        name: 'qrcode',
        component: resolve => {
            require(['./qrcode.vue'], resolve);
        },
    },
    {
        path: '/map',
        name: 'map',
        component: resolve => {
            require(['./map.vue'], resolve);
        },
    },
];

export default new VueRouter({
    routes,
});
