<template>
  <view class="userInfo-page">
    <view class="list">
      <view class="header">
        <view class="title">头像</view>
        <image @tap="chooseImage" :src="userInfo.admin_head?imgURL+userInfo.admin_head:'/static/img/moren.png'" class="user_img"></image>
      </view>
    </view>
    <view class="list">
      <view class="li">
        <view class="title">账号</view>
        <view class="li_title user_name">{{userInfo.admin_account}}</view>
        <!-- <image src="" class="li_more"></image> -->
      </view>
      <navigator :url="'/pages/center/editName?name='+userInfo.admin_fullname" class="li">
        <view class="title">名字</view>
        <view class="li_title">{{userInfo.admin_fullname}}</view>
        <image src="/static/img/gengduo.png" class="li_more"></image>
      </navigator>
      <navigator url="/pages/center/editPhone" class="li">
        <view class="title">手机</view>
        <view class="li_title">{{userInfo.admin_phone}}</view>
        <image src="/static/img/gengduo.png" class="li_more"></image>
      </navigator>
    </view>
  </view>
</template>

<script>
import { getTokenSync } from '@/common/token'
export default {
  data () {
    return {
      imgURL: this.imgURL,
      userInfo: {
        admin_account: '',
        admin_fullname: '',
        admin_head: '',
        admin_phone: '',
        field_10: ' ',
        id: ''
      }
    }
  },
  onLoad () {
    uni.$on('onUserInfoUpdate', () => {
      this.getUserInfo()
    })
    uni.$on('refleshInitData', () => {
      this.getUserInfo()
    })
    this.getUserInfo()
  },
  beforeDestroy () {
    this.$store.dispatch('GetUserInfo')
  },
  methods: {
    chooseImage () {
      const that = this
      uni.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: [], // 从相册选择
        success: function (res) {
          console.log(JSON.stringify(res.tempFilePaths))
          uni.uploadFile({
            url: that.imgURL + '/appsystem/uploadImage',
            filePath: res.tempFilePaths[0],
            name: 'uploadImageName',
            method: 'POST',
            header: {
              Authorization: 'Bearer ' + getTokenSync()
            },
            success (res) {
              uni.$emit('onUserInfoUpdate')
              that.getUserInfo()
            }
          })
        }
      })
    },
    getUserInfo () {
      const that = this
      that.$store.dispatch('GetUserInfo').then(() => {
        Object.assign(that.userInfo, that.$store.getters.userInfo)
      })
    }
  }
}
</script>

<style lang="scss">
.userInfo-page {
  padding: 24upx;

  .list {
    box-shadow: 0px 4upx 20upx rgba(12, 74, 114, 0.1);
    background: $uni-bg-color;
    border-radius: 20upx;
    margin-bottom: 24upx;
    display: flex;
    flex-direction: column;
    padding: 0 24upx;
    box-sizing: border-box;

    .header {
      height: 156upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 38upx 0 8upx;
      box-sizing: border-box;

      .user_img {
        width: 108upx;
        height: 108upx;
        border-radius: $uni-border-radius-circle;
      }
    }

    .title {
      font-size: $uni-font-size-lg;
      color: $mainTextColor;
      font-weight: 500;
    }

    .li {
      height: 92upx;
      border-bottom: 2upx solid $lightBorderColor;
      padding: 0 8upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;

      .li_title {
        font-size: $uni-font-size-lg;
        font-weight: 500;
        color: $mainTextColor;
        flex: 1;
        text-align: right;
      }

      .user_name {
        color: $mainTitleColor;
      }

      .li_more {
        width: 14upx;
        height: 26upx;
        margin-left: 16upx;
      }
    }
  }
}
</style>
