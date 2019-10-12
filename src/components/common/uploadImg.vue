<template>
  <view class="upload-img-page flex">
    <!-- 选择图片 -->
    <template v-if="!isSubmitImg">
      <image v-if="imgUrlArr.length<2" :src="domain+'/front/img/add-img.png'" class="add" @tap="add"></image>
      <view class="img-box" v-for="(item,index) in imgUrlArr" :key="index">
        <image :src="domain+item" class="up-img"></image>
        <image :src="domain+'/front/img/del-img.png'" class="del-img" @tap="del(index)"></image>
      </view>
    </template>
    <!-- 已上传的图片展示 -->
    <view v-else class="img-box" v-for="(item,index) in imgArr" :key="index">
      <image :src="domain+item" class="up-img"></image>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    isSubmitImg: {
      type: Boolean,
      default: false
    },
    imgArr: {
      type: Array,
      default: () => []
    },
    maxImageCount: {
      type: Number,
      default: 2
    }
  },
  watch: {
    imgUrlArr (newValue, oldValue) {
      this.$store.commit('SET_UPLOAD_IMG', newValue)
    }
  },
  data () {
    return {
      domain: process.env.VUE_APP_BASE_URL,
      imgUrlArr: []
    }
  },
  methods: {
    add () {
      const that = this
      this.$choose_and_upload(this.maxImageCount).then(res => {
        for (let i = 0; i < res.length; i++) {
          this.imgUrlArr.push(res[i])
          if (that.maxImageCount - that.imgUrlArr.length < 1) {
            uni.showToast({
              title: `图片不可超过${this.maxImageCount}张`,
              duration: 1000,
              icon: 'none'
            })
            return false
          }
        }
      })
    },
    del (index) {
      this.imgUrlArr.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
.upload-img-page {
  .add {
    width: 140upx;
    height: 140upx;
  }

  .img-box {
    width: 140upx !important;
    height: 140upx !important;
    position: relative;
    margin-left: 24upx;

    .up-img {
      width: 140upx;
      height: 140upx;
      border-radius: 20upx;
    }

    .del-img {
      width: 40upx;
      height: 40upx;
      position: absolute;
      top: -16upx;
      right: -16upx;
    }
  }
}
</style>
