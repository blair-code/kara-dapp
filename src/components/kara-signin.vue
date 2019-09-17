<!-- HTML Template -->
<template>
<section class="probootstrap-intro">
  <div class="container">
    <!-- <hello-metamask/> -->
    <h1 class="center-item">Sign In</h1>
    <br>
    <div id="firebaseui-auth-container" style="margin-bottom:50%"></div>
    <div id="loader">Loading...</div>
      <!-- <a style="" class="btn btn-info btn-lg btn-block" role="button" @click="submit('healthy')">healthy</a>
      <a style="margin-top:1%" class="btn btn-info btn-lg btn-block" role="button" @click="submit('glaucoma')">glaucoma</a>
      <a style="margin-top:1%" class="btn btn-info btn-lg btn-block" role="button" @click="submit('diabetic retinopathy')">diabetic retinopathy</a> -->

      <!-- <router-link to="upload"><a style="margin-top:30%" class="btn btn-primary btn-lg btn-block" role="button">Upload more!</a></router-link> -->
  </div>
</section>
</template>

<!-- Javascript -->
<script>
import toastr from 'toastr'
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import {mapState} from 'vuex'
import HelloMetamask from '@/components/hello-metamask'
// import addProposal from '../util/web3_proposal.service'
export default {
  name: 'kara-signin',
  computed: mapState({
    uploadedFiles (state) {
      return state.data.uploadedFiles
    },
    coinbase: state => state.web3.coinbase,
    ocrModel: state => state.data.model
  }),
  // methods: {
  //   submit (label) {
  //     this.saveMessage(label)
  //   },
  //   saveMessage (label) {
  //     // Add a new message entry to the Firebase Database.
  //     return firebase.database().ref('/data/').push({
  //       imageurls: this.uploadedFiles // hard code that is the image url
  //     }).then((result) => {
  //       console.log('Write to Firebase Database successful', result)
  //       let cb = function (error, result) {
  //         if (!error) {
  //           console.log(JSON.stringify(result))
  //           toastr.success('Data submitted successfully')
  //         } else {
  //           console.error(error)
  //           toastr.error('Error during submission')
  //         }
  //       }
  //     }).catch((error) => {
  //       console.error('Error writing new message to Firebase Database', error)
  //     })
  //   }
  // },
  beforeCreate () {
    if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js')
    var config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    }
    firebase.initializeApp(config)
  },
  mounted () {
    var that = this
    var uiConfig = {
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          var user = authResult.user
          // var credential = authResult.credential
          // var isNewUser = authResult.additionalUserInfo.isNewUser
          // var providerId = authResult.additionalUserInfo.providerId
          // var operationType = authResult.operationType
          console.log(user)
          var dataUploadedFiles = that.$store.state.data.uploadedFiles
          let f
          for (f of dataUploadedFiles) {
            console.log(f)
            firebase.database().ref('/data/').push({
              f_data: f.url, // hard code that is the image url
              f_name: f.originalName,
              f_deg: f.deg,
              f_val: f.needVal,
              f_user: user.uid
            }).then((error, result) => {
              console.log('Write to Firebase Database successful', result)
              if (!error) {
                console.log(JSON.stringify(result))
                toastr.success('Data submitted successfully')
              } else {
                console.error(error)
                toastr.error('Error during submission')
              }
            }).catch((error) => {
              console.error('Error writing new message to Firebase Database', error)
              toastr.error('Error during submission')
            })
          }
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true
        },
        // signInFailure: function (error) {
        //   // Some unrecoverable error occurred during sign-in.
        //   // Return a promise when error handling is completed and FirebaseUI
        //   // will reset, clearing any UI. This commonly occurs for error code
        //   // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
        //   // occurs. Check below for more details on this.
        //   return false
        // },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none'
        }
      },
      signInSuccessUrl: '/#/success',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: 'https://www.oasislabs.com/terms-of-use',
      // Privacy policy url/callback.
      privacyPolicyUrl: function () {
        window.location.assign('https://www.oasislabs.com/privacy-policy')
      }
    }

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth())
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig)
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
