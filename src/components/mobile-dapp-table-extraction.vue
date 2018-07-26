<template>
  <div>
    <hello-metamask/>
    <section class="probootstrap-intro">
      <!-- In the future, we can change into different upload boxes -->
      <oct-table-extraction/>
    </section>
  </div>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import KaraMobileStart from '@/components/kara-mobile-start'
import OCTTableExtraction from '@/components/oct-table-extraction'
export default {
  name: 'mobile-dapp-table-extraction',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from mobile-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'hello-metamask': HelloMetamask,
    'kara-mobile-start': KaraMobileStart,
    'oct-table-extraction': OCTTableExtraction
  }
}
</script>
<style scoped>
.probootstrap-intro {
  height: 100%;
}
</style>
