<template>
  <view class="center-page">
    <view class="header">
      <image src="/static/img/bg.png" class="bg_img" mode=""></image>
      <view class="header_box">
        <image :src="userInfo.admin_head?imgURL+userInfo.admin_head:'/static/img/moren.png'" class="user_img" mode=""></image>
        <view class="user_info">
          <view>{{userInfo.admin_fullname}}</view>
          <view>{{userInfo.admin_phone}}</view>
        </view>
        <navigator class="nav" url="/pages/center/userInfo">
          个人资料
          <image src="/static/img/info_icon.png" class="nav_icon"></image>
        </navigator>
      </view>
    </view>
    <view class="list">
      <navigator url="/pages/faq/index" class="li">
        <image src="/static/img/faq.png" class="li_icon" mode=""></image>
        <view class="li_title">使用教程</view>
        <image src="/static/img/gengduo.png" class="li_more" mode=""></image>
      </navigator>
      <navigator url="/pages/upload/index" class="li">
        <view class="li_title">上传图片</view>
        <image src="/static/img/gengduo.png" class="li_more" mode=""></image>
      </navigator>
    </view>
    <view class="out_btn" @tap="outLogin">退出登录</view>
    <confirm-dialog :msg="confirmData" @hideConfirmPage="hideConfirmPageFun" />
  </view>
</template>

<script>
import { removeToken } from '@/common/token.js'
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
      },
      confirmData: {
        title: '退出登录',
        message: [
          {
            title: '',
            text: '退出当前帐号登录',
            subText: '',
            num: '',
            unit: ''
          }
        ],
        confirmText: '退出',
        cancelText: '取消',
        showCancelButton: true,
        show: false
      },
      hasCancelRequest: false
    }
  },
  onLoad () {
    // uni.$on('onUserInfoUpdate', () => {
    //   this.getUserInfo()
    // })
    // this.getUserInfo()
  },
  onUnload () {
    // uni.$off('onUserInfoUpdate')
  },
  methods: {
    outLogin () {
      const that = this
      that.confirmData.show = true
      that.hasCancelRequest = false
    },
    hideConfirmPageFun (flag) {
      this.confirmData.show = false
      if (flag) {
        removeToken()
        this.$redirectTo('/pages/login/index')
      }
    },
    getUserInfo () {
      const that = this
      that.$store.dispatch('GetUserInfo').then(() => {
        Object.assign(that.userInfo, that.$store.getters.userInfo)
        console.log(that.userInfo)
      })
    }
  }
}
</script>

<style lang="scss">
.center-page {
  .header {
    width: 750upx;
    height: 240upx;
    padding: 32upx;
    position: relative;
    box-sizing: border-box;

    .bg_img {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
    }

    .header_box {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $uni-text-color-inverse;

      .user_img {
        width: 128upx;
        height: 128upx;
        border-radius: $uni-border-radius-circle;
        margin-right: 16upx;
      }

      .user_info {
        font-size: 34upx;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 52upx;
        flex: 1;
      }

      .nav {
        display: flex;
        align-items: center;
        font-size: $uni-font-size-base;

        .nav_icon {
          width: 10upx;
          height: 16upx;
          margin-left: 8upx;
        }
      }
    }
  }

  .list {
    padding: 12upx 24upx;

    .li {
      height: 92upx;
      box-shadow: 0px 4upx 20upx rgba(12, 74, 114, 0.1);
      background: $uni-bg-color;
      border-radius: 20upx;
      margin-bottom: 24upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32upx;
      box-sizing: border-box;

      .li_icon {
        width: 32upx;
        height: 32upx;
        margin-right: 6upx;
      }

      .li_title {
        font-size: $uni-font-size-lg;
        font-weight: 500;
        color: $mainTextColor;
        flex: 1;
      }

      .li_more {
        width: 14upx;
        height: 26upx;
      }
    }
  }

  .out_btn {
    width: 420upx;
    height: 80upx;
    border: 2upx solid rgba(12, 146, 242, 1);
    border-radius: 20upx;
    color: $highLightTextColor;
    font-size: $uni-font-size-lg;
    text-align: center;
    line-height: 80upx;
    position: fixed;
    bottom: calc(var(--window-bottom) + 32upx);
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
