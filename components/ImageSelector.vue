<template>
  <div>
    <el-upload
      action="''"
      :multiple="true"
      accept="image/*"
      listType="picture"
      :on-preview="handlePictureCardPreview"
      :on-change="handleChange"
      :on-remove="handleChange"
      :auto-upload="false"
      :limit="30">
      <el-button size="small" type="primary">Select images</el-button>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: ['value'],
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    computed: {

    },
    methods: {
      handleChange (file, files) {
        this.$emit('file-select', files)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>
<style>
  .el-upload-dragger {
    width: 100%;
    height: 100%;
  }

</style>
