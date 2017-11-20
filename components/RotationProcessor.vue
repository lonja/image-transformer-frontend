<template>
  <div>
    <el-form :model="formData" ref="rotateForm" :rules="validationRules" label-width="60px">
      <el-form-item class="image-selector" label="Files" prop="file">
        <image-selector v-model="formData.files" v-on:file-select="onFileSelect"></image-selector>
      </el-form-item>
      <el-form-item label="Angle" prop="angle">
        <el-select v-model="formData.angle" size="small" placeholder="select angle to rotate image">
          <el-option
            v-for="angle in angles"
            :key="angle.value"
            :label="angle.label"
            :value="angle.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" :loading="loading" @click="onSubmit" size="small">Rotate</el-button>
      </el-form-item>
    </el-form>
    <image-grid :images="urls" :loading="loading"></image-grid>
  </div>
</template>

<script>
  import ImageSelector from './ImageSelector.vue'
  import ImageGrid from './ImageGrid.vue'
  import {rotate} from '../api/image.service'

  export default {
    data () {
      const validateFiles = (rule, value, callback) => {
        console.info('validating files', rule, this.formData.files)
        if (!this.formData.files || this.formData.files.length === 0) {
          callback(new Error('Please select files'))
        } else {
          callback()
        }
      }
      return {
        urls: [],
        loading: false,
        angles: [
          {
            label: '90°',
            value: '90'
          },
          {
            label: '180°',
            value: '180'
          },
          {
            label: '270°',
            value: '270'
          }
        ],
        formData: {
          angle: '',
          files: []
        },
        validationRules: {
          angle: [
            {
              required: true,
              message: 'Please select angle to rotate',
              trigger: 'change'
            }
          ],
          file: [
            {
              required: true,
              validator: validateFiles,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      onSubmit: function () {
        console.info('refs', this.$refs.rotateForm)
        console.info('form data', this.formData)
        this.$refs.rotateForm.validate((valid) => {
          if (valid) {
            this.loading = true
            console.info('rotate', rotate)
            rotate(this.formData).then(files => {
              console.info(`response`, files)
              this.urls = files.map(image => image.image)
              this.loading = false
            }).catch(error => {
              console.error(`error`, error)
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      onFileSelect: function (files) {
        console.info('files', files)
        this.formData.files = files.map(file => file.raw)
        this.images = null
        this.urls = []
      }
    },
    components: {
      ImageSelector,
      ImageGrid
    }
  }
</script>

<style>
  input[type=submit] {
    background: transparent;
    cursor: pointer;
  }

  .image-selector ul {
    max-width: 250px;
    max-height: 210px !important;
    overflow: scroll !important;
  }
</style>
