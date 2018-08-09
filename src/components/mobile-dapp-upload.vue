<template>
  <div>
    <hello-metamask/>
    <section class="probootstrap-intro">
      <!-- In the future, we can change into different upload boxes -->
      <oct-upload-box/>
    </section>
  </div>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import KaraMobileStart from '@/components/kara-mobile-start'
import OCTUploadBox from '@/components/oct-upload-box'
export default {
  name: 'mobile-dapp-upload',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from mobile-dapp.vue')
    this.$store.dispatch('registerWeb3')
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  },
  components: {
    'hello-metamask': HelloMetamask,
    'kara-mobile-start': KaraMobileStart,
    'oct-upload-box': OCTUploadBox
  }
}
</script>
<style scoped>
.probootstrap-intro {
  height: 100%;
}
</style>
