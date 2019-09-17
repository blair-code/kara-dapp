<!-- HTML Template -->
<template>
<section class="probootstrap-intro">
  <div class="container">
    <!-- <hello-metamask/> -->
    <h1 class="center-item">Success!</h1>
      <router-link to="upload"><a style="margin-top:30%" class="btn btn-primary btn-lg btn-block" role="button">Upload more!</a></router-link>
  </div>
</section>
</template>

<!-- Javascript -->
<script>
import toastr from 'toastr'
// import firebase from 'firebase'
// import * as firebaseui from 'firebaseui'
// import {mapState} from 'vuex'
// import HelloMetamask from '@/components/hello-metamask'
// import addProposal from '../util/web3_proposal.service'
export default {
  name: 'kara-success',
  mounted () {
    toastr.success('Data submitted successfully')
  }
}
</script>

<!-- SASS styling -->
<style lang="scss">
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    // background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

  .white {
    color: white;
  }

  .with-margin {
    margin-top: 3%;
    margin-bottom: 0.5%;
  }

  .form {
    width: 47%;
    margin-top: 1%;
    margin-left: 1%;
    margin-right: 1%;
  }
</style>
