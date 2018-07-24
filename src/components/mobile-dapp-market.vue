<template>
  <div>
    <hello-metamask/>
    <section class="probootstrap-intro">
      <!-- In the future, we can change into different upload boxes -->
      <market/>
    </section>
  </div>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import Market from '@/components/market'
export default {
  name: 'mobile-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from mobile-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'hello-metamask': HelloMetamask,
    'market': Market
  }
}
</script>
<style scoped>
.probootstrap-intro {
  height: 100%;
}
</style>
