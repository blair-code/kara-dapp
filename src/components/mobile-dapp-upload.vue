<template>
  <div>
    <hello-metamask/>
    <section class="probootstrap-intro">
      <upload-box/>
      <div class="col col-3">
        <div class="preview"></div>
      </div>
    </section>
  </div>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import KaraMobileStart from '@/components/kara-mobile-start'
import UploadBox from '@/components/upload-box'
export default {
  name: 'mobile-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from mobile-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'hello-metamask': HelloMetamask,
    'kara-mobile-start': KaraMobileStart,
    'upload-box': UploadBox
  }
}
</script>
<style scoped>
.probootstrap-intro {
  height: 100%;
}
</style>
