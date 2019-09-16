<!-- HTML Template -->
<template>
  <div class="container">
    <!--UPLOAD-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <img class="center" src="https://kara.cloud/img/brand/kara-logo-handelson.png" />
      <h2 class="white">
        Data Upload</h2>
      <div class="dropbox">
        <input type="file" multiple="" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
          <p v-if="isInitial" class="white">
            Click here to upload your data ☝️
          </p>
          <p v-if="isSaving" class="white">
            Uploading {{ fileCount }} files...
          </p>
      </div>
    </form>
    <!--SUCCESS-->
    <div v-if="isSuccess" >
      <img class="center" src="https://kara.cloud/img/brand/kara-logo-handelson.png" />
      <h2 class="white">
        Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
      <h3>
        <a class="white" href="javascript:void(0)" @click="reset()">🔙 Upload more</a>
      </h3>
      <ul class="list-unstyled">
        <li v-for="(item, index) in uploadedFiles" :key="item.id">
          <img :id="item.originalName" :src="item.url" class="img-responsive img-thumbnail with-margin" :alt="item.originalName">
          <br>
          <a class="white" @click="rotate(item)">🔄</a>
          <a class="white" @click="remove(index)">❌</a>
        </li>
      </ul>

      <!-- <router-link to="oct-table-extraction"><a class="btn btn-primary btn-lg btn-block" role="button">Next: Extract Tables</a></router-link> -->
      <router-link to="submit-oasis"><a style="margin-top:5%; margin-bottom:5%" class="btn btn-primary btn-lg btn-block" role="button">Submit</a></router-link>

    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <h2 class="white"> 🛑 Uploaded failed</h2>
      <h2>
        <a class="white" href="javascript:void(0)" @click="reset()">🔙 Try again</a>
      </h2>
      <pre>{{ uploadError }}</pre>
    </div>
  </div>
</template>

<!-- Javascript -->
<script>
import { upload } from '../util/file-upload.service'
// import { OCT } from '../util/constants/crops'
// import OCTUploadForm from '@/components/oct-upload-form'
import {mapState} from 'vuex'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'oct-upload-box',
  // components: {
  //   'oct-upload-form': OCTUploadForm
  // },
  data () {
    return {
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      extractedInfos: []
    }
  },
  computed: mapState({
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    },
    uploadedFiles (state) {
      return state.data.uploadedFiles
    }
  }),
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadError = null
      // this.$store.dispatch('resetFiles')
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      upload(formData)
        .then(x => {
          var upload = [].concat(x)
          this.$store.dispatch('addFiles', upload)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
        // .finally(() => {
        //   // coord for important data parts to extract
        //   var coords = [OCT['zeiss_zoom']['table']]
        //   console.log('upload files ...', this.uploadedFiles)
        //   this.extractCoords(this.uploadedFiles[0].url, coords)
        // })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })

      // save it
      this.save(formData)
    },
    rotate (item) {
      var img = document.getElementById(item.originalName)
      img.setAttribute('style', 'transform:rotate(' + item.deg + 'deg)')
      item.deg = item.deg + 90
    },
    remove (index) {
      console.log(this.$store.state.data.uploadedFiles[index])
      this.$store.dispatch('deleteFile', index)
    }
    // extractCoords (file, coords) {
    //   // crop first image and preview it
    //   extractInfos(file, coords)
    //     .then(dataURL => {
    //       this.extractedInfos = [].concat(dataURL)
    //     })
    //     .catch(err => {
    //       this.uploadError = err.response
    //       this.currentStatus = STATUS_FAILED
    //     })
    // },
    // runOCR () {
    //   const postBody = {
    //     'requests': [
    //       {
    //         'features': [
    //           {
    //             'type': 'TEXT_DETECTION'
    //           }
    //         ],
    //         'image': {
    //           'content': this.extractedInfos[0].url.split(',')[1]
    //         }
    //       }
    //     ]
    //   }
    //   console.log(this.extractedInfos[0].url.split(',')[1])
    //   this.$http.post('https://vision.googleapis.com/v1/images:annotate?key=' + apiKey, postBody)
    //     .then(response => {
    //       console.log(response)
    //       // use it to set the form
    //     })
    //     .catch(err => {
    //       console.log('OCR failed ' + err)
    //     })
    //   // this.$refs.form[0].model.avg_rnfl = 10
    // }
  },
  mounted () {
    this.reset()
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
