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
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
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
