// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios // set vue.$http to axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
