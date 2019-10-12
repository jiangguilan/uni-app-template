<template>
  <view class="confirm-dialog" v-if="msg.show">
    <view :class="['popup',{'on':isFocus}]">
      <view class="title">{{msg.title}}</view>
      <view v-if="!msg.showTextarea">
        <view class="text" v-for="(item,index) in msg.message" :key="index">
          <text class="title" v-if="item.title">{{item.title}} :</text>
          <text class="text-msg">{{item.text}}</text>
          <text class="num">{{item.num}}</text>
          <text class="unit">{{item.unit}}</text>
          <text class="text-msg">{{item.subText}}</text>
        </view>
      </view>
      <view v-if="msg.showCalcBox" class="calc-box">
        <view class="text">回桶（{{msg.message[0].unit}}）</view>
        <view class="calc flex">
          <image class="reduce" src="/static/img/reduce.png" @tap="calculateNum('reduce',quantity)"></image>
          <!-- <view class="reduce" @tap="calculateNum('reduce',quantity)">
						-
          </view>-->
          <input
            type="number"
            selection-start="-1"
            selection-end="-1"
            v-model="quantity"
            @focus="onFocus"
            @blur="calculateNum('blur',quantity)"
          />
          <image class="reduce" src="/static/img/plus.png" @tap="calculateNum('plus',quantity)"></image>
          <!-- <view class="plus" @tap="calculateNum('plus',quantity)">
						+
          </view>-->
        </view>
      </view>
      <view v-if="msg.showTextarea" class="textera-box border">
        <textarea
          maxlength="50"
          class="area"
          placeholder-style="color: #98A4B4"
          v-model="valueData"
          placeholder="请输入催单原因，50字以内（选填）"
        />
      </view>
      <view :class="['btn-box flex',{'lonely':!msg.showCancelButton}]">
        <view class="btn on" @tap="confirm">{{msg.confirmText}}</view>
        <view class="btn cancel" v-if="msg.showCancelButton" @tap="cancel">{{msg.cancelText}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniPopup } from '@dcloudio/uni-ui'
export default {
  name: 'ConfirmDialog',
  props: {
    msg: {
      type: Object,
      default: function () {
        return {
          title: '提示',
          message: '',
          confirmText: '确定',
          cancelText: '取消',
          showCancelButton: false,
          show: true
        }
      }
    },
    hideConfirmPage: Function
  },
  data () {
    return {
      valueData: '',
      quantity: 1,
      isFocus: false
    }
  },
  watch: {
    'msg.calcNum' (newValue, oldValue) {
      if (newValue) {
        this.quantity = newValue
      }
    }
  },
  components: {
    uniPopup
  },
  methods: {
    onFocus () {
      this.isFocus = true
    },
    calculateNum (action, quantity) {
      this.isFocus = false
      this.quantity = this.$calculate(quantity, action, 1, 99999, 1, [
        '该商品起订为',
        '该商品最高可定'
      ])
      this.$emit('calclateNum', this.quantity)
    },
    cancel () {
      this.valueData = ''
      this.$emit('hideConfirmPage', false)
    },
    confirm () {
      this.$emit('hideConfirmPage', {
        flag: true,
        data: {
          valueData: this.valueData,
          quantity: this.quantity
        }
      })
      this.valueData = ''
    }
  }
}
</script>

<style lang="scss">
.confirm-dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  background: $uni-bg-color-mask;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999;
  padding: 96upx;
  box-sizing: border-box;
  text-align: center;
  .popup {
    background: #fff;
    padding: 40upx 32upx 24upx;
    min-width: 540upx;
    border-radius: 20upx;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &.on {
      top: 40%;
    }
  }
  .calc-box {
    text-align: center;
    .text {
      color: $mainTitleColor;
      font-size: 32upx;
    }
    .calc {
      margin-bottom: 36upx;
      align-items: center;
      justify-content: center;
    }
  }
  .textera-box {
    width: 100%;
    height: 140upx;
    padding: 12upx 16upx;
    box-sizing: border-box;
    font-size: 32upx;
    color: $lightGrey;
    .area {
      width: 100%;
      height: 100%;
    }
    .uni-textarea-textarea {
      font-size: 32uupx;
      color: $lightGrey;
    }
  }

  .title {
    font-size: 36upx;
    text-align: center;
    margin: 16upx 0 14upx;
  }

  .text {
    font-size: 32upx;
    color: $subLightGrey;
    display: inline-block;
    text-align: center;
    margin: 0 0 32upx;
    .num,
    .unit {
      color: $red;
      font-size: 32upx;
    }
    .title {
      white-space: nowrap;
      font-size: 32upx;
      color: $highLightTextColor;
      margin-right: 8upx;
    }
    .text-msg {
      font-size: 32upx;
      color: $mainTextGrey;
      display: inline;
    }
  }

  .btn-box {
    width: 100%;
    padding: 6upx 0;
    box-sizing: border-box;
    justify-content: space-around;
    flex-wrap: wrap;
    &.lonely {
      .btn {
        &.on {
          margin: 0 150upx;
        }
      }
    }
    .btn {
      margin: 0 40upx 0;
      width: 420upx;
      height: 80upx;
      line-height: 80upx;
      font-size: 32upx;
      &.on {
        margin-bottom: 16upx;
      }
      &.cancel {
        border: none;
        color: $highLightTextColor;
      }
    }
  }
}
</style>
