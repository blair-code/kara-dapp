import Vue from 'vue'
import Router from 'vue-router'
import MobileDapp from '@/components/mobile-dapp'
import MobileDappUpload from '@/components/mobile-dapp-upload'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'mobile-dapp',
    component: MobileDapp
  }, {
    path: '/upload',
    name: 'mobile-dapp-upload',
    component: MobileDappUpload
  }]
})
