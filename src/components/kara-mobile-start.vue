<template>
<div>
    <section id="intro" class="probootstrap-intro" data-stellar-background-ratio="0.5">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8 col-md-offset-2 probootstrap-intro-text">
                <!-- <h1 class="text-center">Kara</h1> -->
                <img class="center" src="../assets/kara-logo.png"/>
                <div class="probootstrap-subtitle text-center">
                    <h2>Own your medical data. Improve research.</h2>
                </div>
                <!--
                <p class="text-center watch-intro">
                  <a href="" class="popup-vimeo">Watch the tutorial <i class="icon-play2"></i></a>
                </p>
                -->
                </div>
            </div>
            <div class="col-md-4 col-md-offset-4">
                <p class="text-center">
                <!-- <label for="file-upload">  -->
                <router-link to="upload"><a class="btn btn-primary btn-lg btn-block" role="button">Share Medical Data</a></router-link>
                <!-- </label> -->
                <!-- <input style="display:None" id="file-upload" type="file" accept="image/*" @change="processFile( $event )"/> -->
                </p>
            </div>
        </div>
        <!-- <a class="proboxwotstrap-scroll-down js-next" href="https://blair-code.github.io/kara-market">Browse Data Market<i class="icon-chevron-right"></i></a> -->
    </section>
</div>
</template>

<script>
export default {
  name: 'kara-mobile-start'
}
</script>
<style scoped>
canvas {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
}
</style>
