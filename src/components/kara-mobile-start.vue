<template>
<div>
    <section class="probootstrap-intro" style="background-image: url(img/hero_bg_2.jpg);" data-stellar-background-ratio="0.5">
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-8 col-md-offset-2 probootstrap-intro-text">
        <h1 class="text-center">Kara</h1>
        <div class="probootstrap-subtitle text-center">
            <h2>Privacy-Preserving Tokenized Data Market for Medical Data</h2>
        </div>
        <p class="text-center watch-intro"><a href="" class="popup-vimeo">Watch the video <i class="icon-play2"></i></a></p>
        </div>
    </div>
    <div class="col-md-4 col-md-offset-4">
        <p class="text-center">
        <!-- <label for="file-upload">  -->
        <router-link to="upload"><a class="btn btn-primary btn-lg btn-block" role="button">Submit Medical Data</a></router-link>
        <!-- </label> -->
        <!-- <input style="display:None" id="file-upload" type="file" accept="image/*" @change="processFile( $event )"/> -->
        </p>
    </div>
    </div>
    <router-link class="probootstrap-scroll-down js-next" to="/market">Browse Data Market<i class="icon-chevron-right"></i></router-link>
    </section>
</div>
</template>

<script>
export default {
  name: 'kara-mobile-start',
  methods: {
    processFile (event) {
      // this.$store.data.image = event.target.files[0]
      this.$router.push('/upload') // change to upload screen
    }
  }
}
</script>
<style scoped>
</style>
