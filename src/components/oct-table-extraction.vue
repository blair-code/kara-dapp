<!-- HTML Template -->
<template>
  <div class="container">
    <h1>Extracted tables</h1>
    <p>
      <router-link to="upload"><a class="white" href="javascript:void(0)">Back to Uploads</a></router-link>
    </p>
    <ul class="list-unstyled">
      <li v-for="item in extractedInfos" :key="item.id">
        <div class="img-responsive img-thumbnail with-margin">
          <img :src="item.url" class="with-margin preview">
          <oct-upload-form ref="form"/>
          <a class="btn btn-info btn-block" role="button" @click="runOCR()">Run OCR</a>
        </div>
      </li>
    </ul>

    <!-- Links to Oasis -->
    <router-link to="submit-oasis"><a class="btn btn-primary btn-lg btn-block" role="button">Next: Submit to Oasis</a></router-link>
  </div>
</template>

<!-- Javascript -->
<script>
import { upload, extractInfos } from '../util/file-upload.service'
import { OCT } from '../util/constants/crops'
import OCTUploadForm from '@/components/oct-upload-form'
import { mapState } from 'vuex'
import toastr from 'toastr'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'oct-table-extraction',
  components: {
    'oct-upload-form': OCTUploadForm
  },
  data () {
    return {
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      extractedInfos: [],
      floats: []
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
      this.$store.dispatch('resetFiles')
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      upload(formData)
        .then(x => {
          var uploadedFiles = [].concat(x)
          this.$store.dispatch('uploadFiles', uploadedFiles)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
        .finally(() => {
          // coord for important data parts to extract
          console.log('upload files ...', this.uploadedFiles)
        })
    },
    extractCoords (file, coords) {
      // crop first image and preview it
      extractInfos(file, coords)
        .then(dataURL => {
          this.extractedInfos = [].concat(dataURL)
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    runOCR () {
      const postBody = {
        'requests': [
          {
            'features': [
              {
                'type': 'TEXT_DETECTION'
              }
            ],
            'image': {
              'content': this.extractedInfos[0].url.split(',')[1]
            }
          }
        ]
      }
      console.log(this.extractedInfos[0].url.split(',')[1])
      var apiKey = 'AIzaSyAAPo-I1OO9QmZYIAv6VrGN70WLvkrAcVQ' // very bad! let's trust everyone right now
      this.$http.post('https://vision.googleapis.com/v1/images:annotate?key=' + apiKey, postBody)
        .then(result => {
          console.log(result.data.responses[0].fullTextAnnotation.text)
          this.floats = result.data.responses[0].fullTextAnnotation.text
            .match(/[+-]?\d+(\.\d+)?/g)
            .map(function (v) { return parseFloat(v) })
        })
        .catch(err => {
          toastr.error(err)
        })
        .finally(() => {
          console.log(this.floats)
          // check if is Int
          // function isInt (n) {
          //   return n % 1 === 0
          // }
          this.$refs.form[0].model.avg_rnfl = this.floats[0] + ' , ' + this.floats[1]
          this.$refs.form[0].model.rnfl_symmetry = this.floats[2]
          this.$refs.form[0].model.rim_area = this.floats[3] + ' , ' + this.floats[4]
          this.$refs.form[0].model.disc_area = this.floats[6] + ' , ' + this.floats[7]
          this.$refs.form[0].model.avg_cd_ratio = this.floats[9] + ' , ' + this.floats[10]
          this.$refs.form[0].model.vertical_cd_ratio = this.floats[11] + ' , ' + this.floats[12]
          this.$refs.form[0].model.cup_vol = this.floats[13] + ' , ' + this.floats[14]
          toastr.success('OCR run successfully')
        })
    }
  },
  mounted () {
    var coords = [OCT['zeiss_zoom']['table']]
    this.extractCoords(this.uploadedFiles[0].url, coords)
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
