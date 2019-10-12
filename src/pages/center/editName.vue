<template>
  <view class="editName-page">
    <view class="list_box">
      <view class="list">
        <view class="title">名字</view>
        <input
          maxlength="16"
          class="input"
          type="text"
          :placeholder="user_name"
          v-model="user_name"
        />
        <!-- <image src="" class="li_more"></image> -->
      </view>
    </view>

    <view class="comfirm_btn" @tap="updateAdminFullname">保存</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      user_name: ''
    }
  },
  onLoad (option) {
    this.user_name = option.name
  },
  methods: {
    updateAdminFullname () {
      const that = this
      if (!this.user_name) {
        uni.showToast({
          icon: 'none',
          duration: 1000,
          title: '请填写昵称'
        })
        return false
      }
      this.$api.center
        .updateAdminFullname({
          admin_fullname: this.user_name
        })
        .then(res => {
          uni.showToast({
            icon: 'success',
            duration: 1000,
            title: '修改成功',
            success () {
              uni.$emit('onUserInfoUpdate')
              that.$back()
            }
          })
        })
    }
  }
}
</script>

<style lang="scss">
.editName-page {
  padding: 24upx 24upx 0;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;

  .list_box {
    width: 100%;
    flex: 1;
  }

  .list {
    box-shadow: 0px 4upx 20upx rgba(12, 74, 114, 0.1);
    background: $uni-bg-color;
    border-radius: 20upx;
    display: flex;
    height: 92upx;
    justify-content: space-between;
    align-items: center;
    padding: 0 32upx;

    box-sizing: border-box;

    .title {
      width: 144upx;
      font-size: $uni-font-size-lg;
      color: $mainTextColor;
      font-weight: 500;
    }

    .input {
      flex: 1;
    }

    .li_more {
      width: 36upx;
      height: 36upx;
      border-radius: $uni-border-radius-circle;
    }
  }

  .comfirm_btn {
    width: 420upx;
    height: 80upx;
    border-radius: 20upx;
    color: $uni-text-color-inverse;
    background: $uni-comfirm-bg-color;
    font-size: $uni-font-size-lg;
    text-align: center;
    line-height: 80upx;
    margin-bottom: 130upx;
  }
}
</style>
