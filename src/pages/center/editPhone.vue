<template>
  <view class="register-page">
    <template v-if="!loading">
      <view class="view-box">
        <view class="list block">
          <view class="item border-bottom flex">
            <text
              class="text"
            >{{!verified?'原手机号码':'新手机号码'}}</text>
            <view class="box inline-flex">
              <input
                class="input"
                type="number"
                v-model="data.admin_phone"
                placeholder="请输入手机号"
                placeholder-style="color:#98A4B4"
              />
            </view>
          </view>
          <view class="item flex">
            <text class="text">验证码</text>
            <view class="box inline-flex">
              <input
                class="input"
                type="text"
                v-model="data.code"
                placeholder="请输入验证码"
                placeholder-style="color:#98A4B4"
              />
              <view
                @tap="getCode"
                :class="['btn',hasSend?'grey':'on']"
              >{{hasSend?'重新获取('+time+'s)':'获取验证码'}}</view>
            </view>
          </view>
        </view>
      </view>
      <view
        class="btn-fill"
        @tap="confirm"
      >{{!verified?'确定':'保存'}}</view>
    </template>
    <view v-if="loading" class="loading">
      <image src="/static/img/loading.gif"></image>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      domain: process.env.VUE_APP_BASE_URL,
      hasSend: false,
      data: {
        admin_phone: '',
        code: ''
      },
      verified: false, // 是否已验证原手机号,如已验证则显示修改手机页面
      time: 60,
      getCodeInterval: 60,
      option: null,
      getTimeType: 'getCodeCurrentTime', // getCodeCurrentTime 获取原手机验证码的时间   getNewCodeCurrentTime 获取新手机验证码的时间
      loading: false
    }
  },
  onLoad (option) {
    this.option = option
    uni.hideTabBar()
    this.checkAction(this.option)
    this.checkTime(this.getTimeType)
    this.getUserInfo()
  },
  beforeDestroy () {
    this.$store.dispatch('GetUserInfo')
  },
  methods: {
    // 检测倒计时
    checkTime () {
      const that = this
      uni.getStorage({
        key: that.getTimeType,
        success: function (res) {
          const interval = Math.floor((new Date().getTime() - res.data) / 1000)
          if (interval < 60) {
            that.hasSend = true
            that.time = 60 - interval
            that.intervalFun()
          } else {
            that.hasSend = false
          }
        }
      })
    },

    // 倒计时函数
    intervalFun (flag) {
      var that = this
      var timer = setInterval(() => {
        that.time--
        that.hasSend = true
        if (that.time <= 0) {
          that.time = 0
          clearInterval(timer)
          timer = null
          that.hasSend = false
        }
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
        timer = null
      })
    },

    // 获取验证码
    getCode () {
      if (this.hasSend) return false
      if (!this.verified) {
        // 发送验证码，验证原手机号
        this.$api.center
          .getCode({ admin_phone: this.data.admin_phone })
          .then(res => {
            uni.setStorage({
              key: this.getTimeType,
              data: new Date().getTime()
            })
            this.hasSend = true
            this.time = this.getCodeInterval
            this.intervalFun()
          })
        return false
      }
      // 发送验证码，验证新手机号(注册，修改手机号)
      this.$api.center.getNewCode({ admin_phone: this.data.admin_phone }).then(res => {
        uni.setStorage({
          key: this.getTimeType,
          data: new Date().getTime()
        })
        this.hasSend = true
        this.time = this.getCodeInterval
        this.intervalFun()
      })
    },
    // 获取个人信息
    getUserInfo () {
      this.loading = true
      this.$store.dispatch('GetUserInfo').then((res) => {
        console.log(res)
        Object.assign(this.data, res)

        this.checkAction(this.option)
      }).finally(() => {
        this.loading = false
      })
    },

    // 判断操作行为
    checkAction (option) {
      if (option.status === 'verified') {
        this.verified = true
        this.getTimeType = 'getNewCodeCurrentTime'
        this.data.admin_phone = ''
        uni.setNavigationBarTitle({
          title: '修改手机号码'
        })
      } else {
        // 验证原手机号码
        this.getTimeType = 'getCodeCurrentTime'
        uni.setNavigationBarTitle({
          title: '验证原手机号码'
        })
      }
    },
    // 确定提交
    confirm () {
      if (!this.data.admin_phone) {
        uni.showToast({
          title: '请输入手机号',
          duration: 1000,
          icon: 'none'
        })
        return false
      } else if (!this.data.code) {
        uni.showToast({
          title: '请输入验证码',
          duration: 1000,
          icon: 'none'
        })
        return false
      } else {
        const that = this
        if (that.verified) {
          // 修改手机号
          that.$api.center.checkNewPhone(that.data).then(res => {
            console.log(res)
            uni.showToast({
              title: '保存成功',
              duration: 1000,
              success: function () {
                that.$redirectTo('/pages/center/userInfo')
              }
            })
          })
        } else {
          // 校验原手机号
          that.$api.center.checkOriginalPhone(that.data).then(res => {
            console.log(res)
            uni.showToast({
              title: '确定成功',
              duration: 1000,
              success: function () {
                that.$redirectTo(
                  '/pages/center/editPhone?status=verified'
                )
              }
            })
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.register-page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 8upx 32upx 130upx;
  box-sizing: border-box;

  .view-box {
    height: 100%;

    .list {
      padding: 0 32upx;
      margin-bottom: 24upx;

      .item {
        position: relative;
        padding: 21upx 0;
        box-sizing: border-box;

        .text {
          white-space: nowrap;
          margin-right: 32upx;
          font-size: 28upx;
        }

        .box {
          width: 100%;

          .picker-box {
            width: 100%;
          }

          .input {
            width: 100%;
            text-align: right;
            color: $mainTextGrey;
            font-size: 28upx;
          }

          .btn {
            margin-left: 24upx;
            min-width: 152upx;
            max-width: auto;
            height: 52upx;
            line-height: 52upx;
            background: none;
            font-size: 24upx;
            position: relative;
            top: -8upx;

            &.grey {
              background: $lightBorderColor;
              border-color: $lightBorderColor;
            }
          }
        }
      }
    }
  }
  .btn-fill {
    margin: 440upx auto 0;
  }
  .btn{
    &.on{
      color: $highLightTextColor;
    }
  }
}
</style>
