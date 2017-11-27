<template>
  <div>
    <el-form :model="formData" label-position="left" ref="rotateForm" :rules="validationRules" label-width="125px" size="small">
      <el-form-item class="image-selector" label="Files" prop="file">
        <image-selector v-model="formData.files" v-on:file-select="onFileSelect"></image-selector>
      </el-form-item>
      <el-form-item label="Image size" prop="size">
        <el-select clearable v-on:change="onSizeChange" v-model="formData.size" placeholder="select size" size="small">
          <el-option
            v-for="size in sizes"
            :key="size.value"
            :label="size.label"
            :value="size.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.size === 'custom'" label="Keep aspect ratio" prop="aspectRatio">
        <el-switch v-model="formData.keepRatio" size="small"></el-switch>
      </el-form-item>
      <el-form-item v-if="formData.size === 'custom'" label="Width">
        <el-col :span="2">
          <el-input-number controls-position="right"
                           :min="0"
                           :max="maxWidth"
                           v-model="formData.width"
                           style="width: 100%;"
                           size="small"
                           v-on:change="onWidthChange"></el-input-number>
        </el-col>
        <el-col :span="2">
          <el-select v-model="formData.widthUnit" style="width: 100%;" size="small">
            <el-option
              v-for="unit in units"
              :key="unit.value"
              :label="unit.label"
              :value="unit.value">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item v-if="formData.size === 'custom'"  label="Height">
        <el-col :span="2">
          <el-input-number controls-position="right"
                           :min="0"
                           :max="maxHeight"
                           v-model="formData.height"
                           style="width: 100%;"
                           size="small"
                           v-on:-change="onHeightChange"></el-input-number>
        </el-col>
        <el-col :span="2">
          <el-select v-model="formData.heightUnit" style="width: 100%;" size="small">
            <el-option
              v-for="unit in units"
              :key="unit.value"
              :label="unit.label"
              :value="unit.value">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="success" :loading="loading" @click="onSubmit" size="small">Resize</el-button>
      </el-form-item>
    </el-form>
    <image-grid :images="urls" :loading="loading"></image-grid>
  </div>
</template>

<script>
  import ImageSelector from './ImageSelector.vue'
  import ImageGrid from './ImageGrid.vue'
  import { resize } from '../api/image.service'

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
        sizes: [
          {
            label: '75%',
            value: 75
          },
          {
            label: '50%',
            value: 50
          },
          {
            label: '25%',
            value: 25
          },
          {
            label: 'Custom size',
            value: 'custom'
          }
        ],
        units: [
          {
            label: 'percent',
            value: '%'
          },
          {
            label: 'pixel',
            value: 'px'
          }
        ],
        formData: {
          width: '',
          widthUnit: 'px',
          height: '',
          heightUnit: 'px',
          files: [],
          keepRatio: true,
          size: ''
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
        this.urls = []
        this.$refs.rotateForm.validate((valid) => {
          if (valid) {
            this.loading = true
            const data = {
              files: this.formData.files,
              keepRatio: this.formData.keepRatio,
              width: this.formData.width + this.formData.widthUnit,
              height: this.formData.height + this.formData.heightUnit
            }
            resize(data).then(files => {
              console.info(`response`, files)
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
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      onFileSelect: function (files) {
        this.formData.files = files.map(file => file.raw)
      },
      onSizeChange: function (value) {
        if (value === 'custom') {
          return
        }
        this.formData.width = value
        this.formData.height = value
        this.formData.widthUnit = '%'
        this.formData.heightUnit = '%'
      },
      onHeightChange: function (value) {
        console.info('expression result', this.formData.widthUnit !== this.formData.heightUnit || this.formData.heightUnit !== '%')
        if (!this.formData.keepRatio || this.formData.widthUnit !== this.formData.heightUnit || this.formData.heightUnit !== '%') {
          return
        }
        this.formData.width = value
      },
      onWidthChange: function (value) {
        console.info('expression result', this.formData.widthUnit !== this.formData.heightUnit || this.formData.widthUnit !== '%')
        if (!this.formData.keepRatio || this.formData.widthUnit !== this.formData.heightUnit || this.formData.widthUnit !== '%') {
          return
        }
        this.formData.height = value
      }
    },
    computed: {
      maxHeight: function () {
        if (this.formData.heightUnit !== 'px') {
          return 100
        }
        return 9999
      },
      maxWidth: function () {
        if (this.formData.widthUnit !== 'px') {
          return 100
        }
        return 9999
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
