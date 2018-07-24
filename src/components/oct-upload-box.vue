<!-- HTML Template -->
<template>
  <div class="container">
    <!--UPLOAD-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1>Upload images</h1>
      <div class="dropbox">
        <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
          <p v-if="isInitial">
            Drag your file(s) here to begin<br> or click to browse
          </p>
          <p v-if="isSaving">
            Uploading {{ fileCount }} files...
          </p>
      </div>
    </form>
    <!--SUCCESS-->
    <div v-if="isSuccess">
      <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
      <p>
        <a class="white" href="javascript:void(0)" @click="reset()">Upload again</a>
      </p>
      <ul class="list-unstyled">
        <li v-for="item in uploadedFiles" :key="item.id">
          <img :src="item.url" class="img-responsive img-thumbnail with-margin" :alt="item.originalName">
          <a class="white">{{ item.originalName }}</a>
        </li>
      </ul>
      <h2>Extracted tables</h2>
      <ul class="list-unstyled">
        <li v-for="item in extractedInfos" :key="item.id">
          <div class="img-responsive img-thumbnail with-margin">
            <img :src="item.url" class="with-margin preview">
            <!-- Button temporary to limit calls to google's OCR engine, we'll replace it with our own OCR soon -->
            <oct-upload-form ref="form"/>
            <a class="btn btn-info btn-block" role="button" @click="runOCR()">Run OCR</a>
          </div>
        </li>
      </ul>
    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <h2>Uploaded failed.</h2>
      <p>
        <a class="white" href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
  </div>
</template>

<!-- Javascript -->
<script>
import { upload, extractInfos } from '../util/file-upload.service'
import { OCT } from '../util/constants/crops'
import OCTUploadForm from '@/components/oct-upload-form'


const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'oct-upload-box',
  components: {
    'oct-upload-form': OCTUploadForm
  },
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      extractedInfos: []
    }
  },
  computed: {
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
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
      this.extractedInfos = []
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      upload(formData)
        .then(x => {
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
          // coord for important data parts to extract
          var coords = [OCT['zeiss_zoom']['table']]
          this.extractCoords(this.uploadedFiles[0].url, coords)
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
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
      var api_key = 'AIzaSyAAPo-I1OO9QmZYIAv6VrGN70WLvkrAcVQ'
      this.$http.post('https://vision.googleapis.com/v1/images:annotate?key=' + api_key, postBody)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log('OCR failed')
        })
      // this.$refs.form[0].model.avg_rnfl = 10
    }
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
