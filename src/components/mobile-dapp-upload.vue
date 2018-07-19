<template>
  <div>
    <hello-metamask/>
    <section class="probootstrap-intro">
      <upload-box/>
      <router-link to="upload"><a class="btn btn-primary btn-lg btn-block" role="button">Submit To Oasis</a></router-link>
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
