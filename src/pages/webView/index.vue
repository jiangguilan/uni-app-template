<template>
  <view class="luck-draw-record-detail-page">
    <web-view class="text" :src="detailUrl"></web-view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      detailUrl: ''
    }
  },
  onLoad (option) {
    this.detailUrl = option.url
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
</style>
