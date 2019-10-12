<template>
  <view class="deposit-page">
    <!-- 引入upload组件 -->
    <upload :isSubmitImg="isSubmitImg" :imgArr="imgArr" :maxImageCount="3"></upload>
  </view>
</template>

<script>
import upload from '@/components/common/uploadImg.vue'
export default {
  components: { upload },
  data () {
    return {
      domain: getApp().globalData.baseUrl,
      isSubmitImg: false, // 是否已上传图片
      imgArr: [] // 上传图片
    }
  },
  onLoad (option) {},
  computed: {
    // 已选择的图片数组
    uploadImg () {
      return this.$store.getters.uploadImg
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.deposit-page {
  padding: 24upx;
  box-sizing: border-box;
}
</style>
