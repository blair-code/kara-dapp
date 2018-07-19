<template>
  <div class='panel-body'>
    <form>
      <vue-form-generator :schema='schema' :model='model' :options='formOptions'>
      </vue-form-generator>
    </form>
  </div>
</template>

<script>
import VueFormGenerator from 'vue-form-generator'
import { validators } from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'

export default {
  name: 'upload-form',
  components: {
    'vue-form-generator': VueFormGenerator.component
  },
  data () {
    return {

      model: {
        avg_rnfl: null,
        rim_area: null,
        disc_area: null,
        avg_cd_ratio: null,
        vertical_cd_ratio: null,
        cup_vol: null
      },

      schema: {
        groups: [
          {
            legend: 'OCT summary table',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Average RNFL Thickness (in μm)',
                model: 'avg_rnfl',
                placeholder: ''              
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Rim Area (in mm²)',
                model: 'rim_area',
                placeholder: ''
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Disc Area (in mm²)',
                model: 'disc_area',
                placeholder: ''
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Average C/D Ratio',
                model: 'avg_cd_ratio',
                placeholder: ''
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Vertical C/D Ratio',
                model: 'vertical_cd_ratio',
                placeholder: ''
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Cup Volume (in mm³)',
                model: 'cup_vol',
                placeholder: ''
              }
            ]
          }],

          formOptions: {
            validateAfterLoad: true,
            validateAfterChanged: true,
            fieldIdPrefix: 'user-'
          }
        }
      }
    }
  }
</script>

<style>

</style>