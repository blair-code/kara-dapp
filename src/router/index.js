import Vue from 'vue'
import Router from 'vue-router'
import MobileDapp from '@/components/mobile-dapp'
import MobileDappUpload from '@/components/mobile-dapp-upload'
import MobileDappTableExtraction from '@/components/mobile-dapp-table-extraction'
import SubmitOasis from '@/components/submit-oasis'

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
    path: '/oct-table-extraction',
    name: 'mobile-dapp-table-extraction',
    component: MobileDappTableExtraction
  },
  {
    path: '/submit-oasis',
    name: 'submit-oasis',
    component: SubmitOasis
  }]
})
