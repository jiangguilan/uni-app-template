<template>
  <view class="tab-box flex">
    <view class="item" v-for="(item,index) in navList" :key="index" @tap="setActiveId(item.id)">
      <text :class="['text',{'on':item.id==status}]">{{item.title}}</text>
      <view :class="['icon',{'more':item.num>99}]" v-if="item.num>0">{{item.num>99?'...':item.num}}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: 0
    },
    navList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    // 控制顶部nav高亮
    setActiveId (id) {
      if (this.loading) return false
      this.loading = true
      this.$emit('setActiveId', id)
      this.loading = false
    }
  }
}
</script>
<style lang="scss">
.tab-box {
  padding: 0 52upx;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  top: var(--window-top);
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  z-index: 100;

  .item {
    position: relative;
    padding: 24upx 0;
    box-sizing: border-box;

    .text {
      color: $subLightGrey;
      font-size: 28upx;
      font-weight: bold;

      &.on {
        color: $mainTitleColor;
        &::after {
          display: block;
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
          width: 100%;
          height: 6upx;
          border-radius: 6upx;
          background: $mainTitleColor;
        }
      }
    }
    .icon {
      display: inline-block;
      vertical-align: middle;
      width: 32upx;
      height: 32upx;
      background: $red;
      border-radius: 50%;
      color: #fff;
      font-size: 20upx;
      text-align: center;
      line-height: 32upx;
      margin-left: 8upx;
      &.more {
        line-height: 16upx;
      }
    }
  }
}
</style>
