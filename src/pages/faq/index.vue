<template>
  <view class="faq-page">
    <view
      class="item flex"
      @tap="$go('../../pages/webView/index?url='+item.link)"
      v-for="(item,index) in list"
      :key="index"
    >
      <view class="msg">
        <view class="title">{{item.title}}</view>
        <view class="text">{{item.description}}</view>
      </view>
      <image class="img" src="/static/img/gengduo.png"></image>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          title: '使用教程',
          description: '这是使用教程',
          link: 'http://www.baidu.com'
        }
      ]
    }
  },
  onLoad () {
  },
  methods: {}
}
</script>

<style lang="scss">
.faq-page {
  padding: 0 24upx;
  box-sizing: border-box;
  .item {
    margin: 24upx 0 0;
    box-shadow: 0px 4px 20px rgba(12, 74, 114, 0.1);
    border-radius: 20upx;
    background: #fff;
    padding: 24upx 32upx 24upx 48upx;
    box-sizing: border-box;
    .img {
      width: 14upx;
      height: 26upx;
    }
  }
}
</style>
