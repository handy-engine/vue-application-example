
import Vue from 'vue';

import Vuex from 'vuex';
import VueRouter from 'vue-router';

import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  mode: 'hash'
});

const store = new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {}
});

new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<app/>'
})