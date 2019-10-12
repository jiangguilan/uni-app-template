<template>
  <view class="login-page">
    <image src="/static/img/logo.png" class="logo" mode=""></image>
    <view class="title">DD订水平台</view>
    <view class="form">
      <view class="form_list">
        <view class="li">
          <view class="form_title">账号：</view>
          <input class="input" type="text" value v-model="loginData.admin_account" />
        </view>
        <view class="li">
          <view class="form_title">密码：</view>
          <input
            class="input"
            :type="passShow?'text':'password'"
            value
            v-model="loginData.admin_password"
          />
          <image @tap="passShowFun" v-if="passShow" class="pass_status" src="/static/img/zhanshi.png" ></image>
          <image @tap="passShowFun" v-else class="pass_status" src="/static/img/biyan.png" ></image>
        </view>
      </view>

      <label class="radio_label" @tap="checkboxChange">
        <radio class="form_radio" :checked="checked" />记住密码
      </label>
    </view>

    <view class="btn_box">
      <view class="button" @tap="formSubmit">登录</view>
    </view>
  </view>
</template>

<script>
import { setToken, removeToken } from '@/common/token.js'
export default {
  data () {
    return {
      loginData: {
        admin_account: uni.getStorageSync('admin_account') || '',
        admin_password: uni.getStorageSync('admin_password') || ''
      },
      checked: true,
      passShow: false
    }
  },
  onLoad () {},
  methods: {
    loadFun (flag) {
      if (flag) {
        uni.showLoading({
          title: '登录中'
        })
      } else {
        setTimeout(() => {
          uni.hideLoading()
        }, 300)
      }
    },
    formSubmit () {
      var tip = title => {
        uni.showToast({
          title: title,
          duration: 1000,
          icon: 'none'
        })
      }
      const that = this
      if (!that.loginData.admin_account) {
        tip('请填写账号')
        return false
      } else if (!that.loginData.admin_password) {
        tip('请输入密码')
        return false
      } else {
        that.loadFun(true)
        that.$api.login
          .passLogin(that.loginData)
          .then(res => {
            setToken(res.data.token)
            that.loadFun(false)
            if (that.checked) {
              uni.setStorageSync('admin_account', that.loginData.admin_account)
              uni.setStorageSync(
                'admin_password',
                that.loginData.admin_password
              )
            } else {
              uni.removeStorageSync('admin_account')
              uni.removeStorageSync('admin_password')
            }
            uni.$emit('refleshInitData')
            getApp().globalData.hasLogin = true
            that.$toTabBar('/pages/order/index')
          })
          .catch(err => {
            that.loadFun(false)
            tip(err.msg)
          })
      }
    },
    checkboxChange (e) {
      this.checked = !this.checked
    },
    passShowFun () {
      this.passShow = !this.passShow
    }
  },
  watch: {}
}
</script>

<style lang="scss">
/deep/uni-page-head {
  display: none;
}

page {
  height: 100%;
}

.login-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  align-items: center;
  .logo {
    width: 160upx;
    height: 160upx;
    border-radius: $uni-border-radius-circle;
    margin: 48upx 0 18upx;
  }

  .title {
    color: #7f92a9;
    font-size: $uni-font-size-lg;
    margin-bottom: 44upx;
  }

  .form {
    display: flex;
    flex-direction: column;

    .form_list {
      margin-bottom: 40upx;
      display: flex;
      flex-direction: column;
      width: 702upx;
      background: $uni-bg-color;
      box-shadow: 0upx 4upx 20upx rgba(12, 74, 114, 0.1);
      opacity: 1;
      padding: 0 24rpx;
      box-sizing: border-box;
      border-radius: 20upx;

      .li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 92upx;
        border-bottom: 1upx solid $lightBorderColor;

        &:last-child {
          border-bottom: none;
        }

        .form_title {
          width: 100upx;
          font-size: $uni-font-size-lg;
          color: $uni-text-color;
          font-weight: 500;
        }

        .input {
          height: 100%;
          background: $uni-bg-color;
          flex: 1;
          color: $mainTitleColor;
          border: none;
          padding: 0;
          outline: none;
        }

        .pass_status {
          width: 30upx;
          height: 28upx;
        }
      }
    }

    .radio_label {
      display: flex;
      align-items: center;

      .form_radio {
        transform: scale(0.7);
      }
    }
  }
  .btn_box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 426upx 0 130upx;

    .button {
      font-size: $uni-font-size-lg;
      background: #0c92f2;
      border-radius: 20upx;
      width: 420upx;
      height: 80upx;
      line-height: 80upx;
      color: $uni-text-color-inverse;
      text-align: center;
      border: none;
    }
  }
}
</style>
