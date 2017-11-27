<template>
  <div>
    <el-form :model="formData" ref="flipFlopForm" :rules="validationRules" label-width="50px">
      <el-form-item class="image-selector" label="Files" prop="file">
        <image-selector v-model="formData.files" v-on:file-select="onFileSelect"></image-selector>
      </el-form-item>
      <el-form-item prop="function">
        <el-radio-group v-model="formData.option" size="small">
          <el-radio-button label="Flip"></el-radio-button>
          <el-radio-button label="Flop"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="success" :loading="loading" @click="onSubmit" size="small">{{ formData.option }}</el-button>
      </el-form-item>
    </el-form>
    <image-grid :images="urls" :loading="loading"></image-grid>
  </div>
</template>

<script>
  import ImageSelector from './ImageSelector.vue'
  import ImageGrid from './ImageGrid.vue'
  import { flip, flop } from '../api/image.service'

  export default {
    data () {
      const validateFiles = (rule, value, callback) => {
        if (!this.formData.files || this.formData.files.length === 0) {
          callback(new Error('Please select files'))
        } else {
          callback()
        }
      }
      return {
        urls: [],
        loading: false,
        formData: {
          option: 'Flip',
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
        this.$refs.flipFlopForm.validate((valid) => {
          if (!valid) {
            return
          }
          this.loading = true
          this.formData.option === 'Flip' ? this.sendFlipRequest() : this.sendFlopRequest()
        })
      },
      onFileSelect: function (files) {
        console.info('files', files)
        this.formData.files = files.map(file => file.raw)
      },
      sendFlipRequest () {
        flip(this.formData).then(files => {
          this.urls = files.map(image => {
            if (image.error && image.error !== '') {
              this.$notify.error({
                title: 'Error occurred',
                message: image.error
              })
              return
            }
            image.image.url = image.image.url + '?' + new Date().getTime()
            return image.image
          })
          this.loading = false
        })
      },
      sendFlopRequest () {
        flop(this.formData).then(files => {
          this.urls = files.map(image => {
            image.image.url = image.image.url + '?' + new Date().getTime()
            return image.image
          })
          this.loading = false
        })
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
