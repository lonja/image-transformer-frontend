<template>
  <div class="image-grid">
    <el-upload
      action="''"
      v-loading="loading"
      accept="image/*"
      :file-list="images"
      listType="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-change="handleChange"
      :auto-upload="false"
      :limit="30">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: [
      'loading',
      'images'
    ],
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        loading: false,
        images: []
      }
    },
    computed: {},
    methods: {
      handleChange (ignored, files) {
        this.$emit('file-select', files)
        this.$emit('input', files)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>
<style>
  .image-grid .el-upload {
    display: none;
  }

</style>
