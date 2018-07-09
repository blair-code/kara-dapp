<template>
  <div>
    <hello-metamask/>
    <kara-mobile-start/>
  </div>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import KaraMobileStart from '@/components/kara-mobile-start'
export default {
  name: 'mobile-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from mobile-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'hello-metamask': HelloMetamask,
    'kara-mobile-start': KaraMobileStart
  }
}
</script>
<style scoped>
</style>
