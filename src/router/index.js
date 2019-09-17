import Vue from 'vue'
import Router from 'vue-router'
import MobileDapp from '@/components/mobile-dapp'
import MobileDappUpload from '@/components/mobile-dapp-upload'
import KaraSignIn from '@/components/kara-signin'
import KaraSuccess from '@/components/kara-success'

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
  },
  {
    path: '/signin',
    name: 'kara-signin',
    component: KaraSignIn
  },
  {
    path: '/success',
    name: 'kara-success',
    component: KaraSuccess
  }]
})
