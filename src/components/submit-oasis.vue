<!-- HTML Template -->
<template>
<div>
    <router-link to="upload"><a style="margin-top:30%" class="btn btn-primary btn-lg btn-block" role="button">Submit more!</a></router-link>
</div>
</template>

<!-- Javascript -->
<script>
import toastr from 'toastr'
import firebase from 'firebase'
import {mapState} from 'vuex'

export default {
  name: 'oct-table-extraction',
  computed: mapState({
    uploadedFiles (state) {
      return state.data.uploadedFiles
    },
    coinbase: state => state.web3.coinbase
  }),
  methods: {
    saveMessage () {
      // Add a new message entry to the Firebase Database.
      return firebase.database().ref('/data/').push({
        account: this.coinbase,
        price: 99,
        rating: 0,
        imageurl: this.uploadedFiles[1].url // hard code that is the image url
      }).catch((error) => {
        console.error('Error writing new message to Firebase Database', error)
      })
    }
  },
  mounted () {
    // See https://firebase.google.com/docs/web/setup#project_setup for how to
    // Initialize Firebase
    this.saveMessage()
    toastr.success('Data added successfully')
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
