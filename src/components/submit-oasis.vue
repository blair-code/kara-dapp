<!-- HTML Template -->
<template>
<div style="margin-left:3%;margin-right:3%">
  <hello-metamask/>
  <h1 style="margin-top:5%">Tag and Submit</h1>
    <a style="" class="btn btn-info btn-lg btn-block" role="button" @click="submit('healthy')">healthy</a>
    <a style="margin-top:1%" class="btn btn-info btn-lg btn-block" role="button" @click="submit('glaucoma')">glaucoma</a>
    <a style="margin-top:1%" class="btn btn-info btn-lg btn-block" role="button" @click="submit('diabetic retinopathy')">diabetic retinopathy</a>

    <router-link to="upload"><a style="margin-top:30%" class="btn btn-primary btn-lg btn-block" role="button">Upload more!</a></router-link>
</div>
</template>

<!-- Javascript -->
<script>
import toastr from 'toastr'
import firebase from 'firebase'
import {mapState} from 'vuex'
import HelloMetamask from '@/components/hello-metamask'

export default {
  name: 'oct-table-extraction',
  computed: mapState({
    uploadedFiles (state) {
      return state.data.uploadedFiles
    },
    coinbase: state => state.web3.coinbase,
    ocrModel: state => state.data.model
  }),
  methods: {
    submit (label) {
      this.saveMessage(label)
      toastr.success('Data added successfully')
    },
    saveMessage (label) {
      // Add a new message entry to the Firebase Database.
      return firebase.database().ref('/data/').push({
        account: this.coinbase,
        price: 99,
        rating: 0,
        category: label,
        ocr_model: this.ocrModel,
        imageurls: this.uploadedFiles // hard code that is the image url
      }).then((id) => {
        console.log('Write to Firebase Database successful', id)
      }).catch((error) => {
        console.error('Error writing new message to Firebase Database', error)
      })
    }
  },
  mounted () {
  },
  components: {
    'hello-metamask': HelloMetamask
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
