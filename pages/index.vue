<template>
  <el-container>
    <el-header>Image Processor</el-header>
    <el-main>
      <el-tabs v-model="activeName">
        <el-tab-pane label="Rotate" name="rotate">
          <rotation-processor></rotation-processor>
        </el-tab-pane>
        <el-tab-pane label="Resize" name="resize">
          <resize-processor></resize-processor>
        </el-tab-pane>
        <el-tab-pane label="Crop" name="crop">
          <crop-processor></crop-processor>
        </el-tab-pane>
        <el-tab-pane label="Flip/Flop" name="flipflop">
          <flip-flop-processor></flip-flop-processor>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
  import RotationProcessor from '~/components/RotationProcessor.vue'
  import ResizeProcessor from '~/components/ResizeProcessor.vue'
  import CropProcessor from '~/components/CropProcessor.vue'
  import FlipFlopProcessor from '~/components/FlipFlopProcessor.vue'

  export default {
    data: function () {
      return {
        activeName: 'rotate'
      }
    },
    components: {
      RotationProcessor,
      ResizeProcessor,
      CropProcessor,
      FlipFlopProcessor
    }
  }
</script>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

</style>
