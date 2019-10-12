<template>
  <view class="order-page">
    <nav-tab :status="status" :navList="navList" @setActiveId="setActiveIdFun"></nav-tab>

    <!-- 提交按钮 -->
    <view class="btn-fill" @tap="showModal('confirmMoreBarrelOrder')">弹窗1</view>
    <view class="btn-fill" @tap="showModal('confirmLessBarrelOrder')">弹窗2</view>
    <confirm-dialog
      :msg="confirmData"
      @hideConfirmPage="hideConfirmPageFun"
      @calclateNum="calclateNumFun"
    />

    <!-- 时间筛选 -->
    <view class="btn-fill" @tap="showPickerFun">筛选时间</view>
    <w-picker
      mode="dateTime"
      step="1"
      :current="false"
      :defaultVal="startArr"
      @isShowPicker="isShowPickerFun"
      @confirm="confirmSelect"
      ref="time"
      themeColor="#0C92F2"
    ></w-picker>
  </view>
</template>

<script>
import wPicker from '@/components/w-picker/w-picker.vue'
export default {
  components: {
    wPicker
  },
  data () {
    return {
      confirmData: {},
      // 完成配送订单弹窗（开启回桶功能，并多选）
      confirmMoreBarrelOrder: {
        title: '完成配送',
        message: [
          {
            title: '',
            text: '您将确定完成配送',
            subText: '订单，回桶数等于配送桶数',
            num: '3',
            unit: '个'
          }
        ],
        confirmText: '确定完成',
        cancelText: '取消',
        showCancelButton: true,
        show: false
      },
      // 完成配送订单弹窗（开启回桶功能，并单选）
      confirmLessBarrelOrder: {
        title: '完成配送',
        message: [
          {
            title: '',
            text: '您将确定完成配送',
            subText: '订单',
            num: '3',
            unit: '个'
          }
        ],
        confirmText: '确定完成',
        cancelText: '取消',
        showCancelButton: true,
        show: false,
        showCalcBox: true,
        calcNum: 1
      },

      // 防止多次点击开关
      hasCancelRequest: false,
      loading: false,

      // navTab
      status: 0, // 送货状态   0未接单   1送货中   2已完成   3已取消
      navList: [
        {
          id: 0,
          title: '未接单',
          num: 1
        },
        {
          id: 1,
          title: '配送中',
          num: 0
        },
        {
          id: 2,
          title: '已完成',
          num: 0
        },
        {
          id: 3,
          title: '已取消',
          num: 0
        }
      ],
      endLoad: false,
      openPopupText: '',
      startArr: [0, 0, 0, 0, 0, 0]
    }
  },
  onLoad () {
    uni.$on('refleshInitData', () => {
      this.reflesh()
    })
    this.reflesh()
  },
  onUnload () {
    uni.$off('refleshInitData')
  },
  // 上拉刷新
  onPullDownRefresh () {
    uni.stopPullDownRefresh()
    this.reflesh()
  },
  // 下拉加载
  onReachBottom () {
    this.orderListFun(true)
  },
  methods: {
    // 筛选时间
    showPickerFun () {
      this.$refs.time.show()
    },
    isShowPickerFun (val) {
      console.log(val)
    },
    confirmSelect (val) {
      console.log(val)
    },
    // 刷新页面
    reflesh () {
      this.page = 1
      this.endLoad = false
      this.orderListFun()
    },
    // 获取订单列表
    orderListFun (add) {
      if (this.endLoad) {
        this.$loadFun(false)
        return false
      }
      if (this.loading) {
        this.$loadFun(false)
        return false
      }
      this.loading = true
      this.loading = false
      this.$loadFun(false)
    },
    // 控制顶部nav高亮
    setActiveIdFun (id) {
      if (this.loading) return false
      this.status = id
      this.reflesh()
    },
    // 控制显示弹窗数据
    showModal (data) {
      this[data].show = true
      this.confirmData = this[data]
      this.openPopupText = data

      this.hasCancelRequest = false
    },
    // 隐藏弹窗
    hideConfirmPageFun (flag) {
      if (this.hasCancelRequest) return false
      this.hasCancelRequest = true

      if (flag.flag) {
        // confirm
        this[this.openPopupText].show = false
      } else {
        // cancel
        this.deliverOrder.show = false
        this.confirmNoBarrelOrder.show = false
        this.confirmMoreBarrelOrder.show = false
        this.confirmLessBarrelOrder.show = false

        this.hasCancelRequest = false
      }
    }

  }
}
</script>
<style lang="scss">
.order-page {
  padding: calc(var(--window-top) + 86upx) 24upx calc(var(--window-bottom) + 24upx);
  box-sizing: border-box;
  .btn-fill{
    margin-top: 24upx;
  }
}
</style>
