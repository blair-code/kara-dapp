<template>
  <div>
    <hello-metamask/>
    <kara-mobile-start/>
  </div>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import KaraMobileStart from '@/components/kara-mobile-start'

import firebase from 'firebase'

export default {
  name: 'mobile-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from mobile-dapp.vue')
    this.$store.dispatch('registerWeb3')

    if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js')
    var config = {
      apiKey: 'AIzaSyDMYo_bAJB7wUVMMG5Mehaopy7P0EQWLNc',
      authDomain: 'kara-1a295.firebaseapp.com',
      databaseURL: 'https://kara-1a295.firebaseio.com',
      projectId: 'kara-1a295',
      storageBucket: 'kara-1a295.appspot.com',
      messagingSenderId: '1094511591298'
    }
    firebase.initializeApp(config)
  },
  components: {
    'hello-metamask': HelloMetamask,
    'kara-mobile-start': KaraMobileStart
  }
}
</script>
<style scoped>
</style>
