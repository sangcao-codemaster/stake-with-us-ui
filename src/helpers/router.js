import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/home';
Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
        { path: '/', component: HomePage },
        { path: '*', redirect: '/' }
    ]
});