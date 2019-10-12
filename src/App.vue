<script>
import { checkUpdate } from '@/utils/update'
import pageAnimation from './components/page-animation'
export default {
  mixins: [pageAnimation], // h5页面切换的动画效果
  globalData: {
    baseUrl: process.env.VUE_APP_BASE_URL, // api域名
    loginPromise: null, // 登陆promise
    hasLogin: false
  },
  data () {
    return {
      checkUrl: 'http://demo.dcloud.net.cn/test/update/check.php',
      wgtUrl: 'http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt'
    }
  },
  onLaunch: function (option) {
    // #ifdef APP-PLUS
    checkUpdate(this.checkUrl)
    // #endif
  },
  onShow: function () {
    console.log('onShow')
  },
  onHide: function () {
    console.log('onHide')
  },
  methods: {
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
page {
  background: $mainBg;
  color: $mainTextColor;
  text-align: left;
  font-size: 28upx;
}

uni-tabbar .uni-tabbar__reddot {
  left: 20px;
  top: 3px;
  padding: 0em 0.4em;
}

// mescroll
.mescroll-empty {
  display: none;
}

// 文字溢出省略
.textEllipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 文字溢出两行省略
.textEllipsis2 {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  word-break: break-all;
  display: -webkit-box;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
}

// 头部 nav 颜色
.uni-page-head {
  background-color: #fff !important;
}

// 通用轮播图
.page-section {
  height: 280upx;

  swiper {
    height: 280upx !important;
    border-radius: 20upx;
    overflow: hidden;
  }

  uni-image,
  image {
    width: 100% !important;
    height: 100% !important;
    border-radius: 20upx;
    overflow: hidden;

    img {
      border-radius: 20upx;
      width: 100%;
      height: auto;
    }
  }
}

// 通用原价
.origin-price {
  font-size: 20upx;
  color: $lightGrey;
  text-decoration: line-through;
}

// 通用有padding的白色块
.block {
  background: #fff;
  border-radius: 20upx;
  box-shadow: 0px 4px 20px rgba(12, 74, 114, 0.1);
  padding: 18upx 24upx;
  box-sizing: border-box;
  margin-top: 24upx;
  &.no-shadow {
    box-shadow: none;
  }
}

// flex 布局
.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;

  image {
    flex-shrink: 0;
  }

  .inline-flex {
    display: inline-flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;

    image {
      flex-shrink: 0;
    }
  }
}

// 数量加减按钮
.calc {
  width: auto;

  .reduce {
    display: inline-block;
    width: 48upx;
    height: 48upx;
    // font-size: 48upx;
    // background: $mainTitleColor;
    // color: #fff;
    // border-radius: 50%;
    // line-height: 34upx;
    // vertical-align: top;
    // text-align: center;
    // background: url('/static/img/reduce.png') no-repeat;
    // background-size: contain;
  }

  uni-input {
    width: 100upx;
    height: 48upx !important;
    min-height: 48upx;
    line-height: 48upx;
    display: inline-block;
    text-align: center;
    border: 1upx solid $secBorderColor;
    margin: 0 12upx;
    font-size: 32upx;

    input {
      width: 100upx;
      height: 48upx !important;
      min-height: 48upx;
      line-height: 48upx;
      color: $mainTitleColor;
      font-size: 32upx;
    }
  }

  input {
    display: inline-block;
    text-align: center;
    width: 100upx;
    height: 48upx !important;
    min-height: 48upx;
    line-height: 48upx;
    color: $mainTitleColor;
    font-size: 32upx;
    border: 1upx solid $secBorderColor;
    margin: 0 12upx;
  }

  .plus {
    display: inline-block;
    width: 48upx;
    height: 48upx;
    // font-size: 44upx;
    // background: $mainTitleColor;
    // color: #fff;
    // border-radius: 50%;
    // line-height: 44upx;
    // vertical-align: top;
    // text-align: center;
    // background: url('/static/img/plus.png') no-repeat;
    // background-size: contain;
  }
}

// 通用的 btn
.btn {
  width: 296upx;
  height: 80upx;
  border-radius: 20upx;
  line-height: 80upx;
  padding: 0;
  border: 1px solid $lightGrey;
  background: #fff;
  color: $lightGrey;
  margin: 18upx 0 0;
  text-align: center;

  &.on {
    border-color: $highLightTextColor;
    background: $highLightTextColor;
    color: #fff;
  }
}

// 底部的 nav 栏
.bottom {
  position: fixed;
  bottom: var(--window-bottom);

  // /* #ifdef H5 */
  // bottom: 90upx;
  // /* #endif */

  left: 50%;
  transform: translate(-50%, 0);
  background: #fff;
  width: 100%;
  height: 88upx;
  padding: 0 0 0 32upx;
  box-sizing: border-box;
  line-height: 88upx;
  z-index: 99;
}

// 填充的 btn
.btn-fill {
  width: 420upx;
  height: 80upx;
  background: $highLightTextColor;
  box-shadow: 0px 4upx 12upx rgba(0, 0, 0, 0.1);
  border-radius: 20upx;
  color: #fff;
  text-align: center;
  line-height: 80upx;
  &.grey {
    background: $secBorderColor;
  }
  &.fail {
    color: $red;
  }
}

// radio
.uni-radio-input {
  margin: 0;
  border-color: $borderBlue !important;
}

// 未填充右箭头
.right-icon {
  width: 14upx;
  height: 28upx;
  margin-left: 16upx;
}
uni-tabbar .uni-tabbar-border {
  background: $borderColor !important;
}

// popup 注：目前以下样式只h5有效
.uni-mask {
  background-color: rgba(0, 0, 0, 0.6) !important;
}
uni-modal {
  .uni-modal {
    border-radius: 20upx;
  }
  .uni-modal__title {
    font-size: 34upx;
    color: $mainTitleColor;
  }
  .uni-modal__hd {
    padding-top: 40upx;
  }
  .uni-modal__bd {
    font-size: 24upx;
    color: $lightGrey;
  }
  .uni-modal__ft {
    padding: 24upx 0 48upx 0;
    box-sizing: border-box;
    &:after {
      border: none;
    }
    justify-content: space-around;
    .uni-modal__btn {
      padding: 12upx 40upx;
      box-sizing: border-box;
      width: auto;
      height: auto;
      line-height: normal;
      display: inline-block;
      border: 1px solid;
      border-radius: 20upx;
      flex: inherit;
      font-size: 24upx;
      min-width: 176upx;
      &.uni-modal__btn_primary {
        background: $moreLightBlue;
      }
    }
  }
}
.border {
  border: 1px solid $lightBorderColor;
}
.border-top::before {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: $lightBorderColor;
}
.border-bottom::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: $lightBorderColor;
}
.bottom-btn {
  position: fixed;
  width: 420upx;
  height: 80upx;
  line-height: 80upx;
  background: $highLightTextColor;
  box-shadow: 0upx 4upx 12upx rgba(0, 0, 0, 0.16);
  border-radius: 20upx;
  bottom: calc(var(--window-bottom) + 32upx);
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  font-size: 32upx;
  color: #fff;
}
uni-toast {
  min-width: 8em;
  width: auto;
  padding-left: 32upx;
  padding-right: 32upx;
  .uni-toast {
    min-width: 8em;
    width: auto;
    padding-left: 32upx;
    padding-right: 32upx;
  }
}
</style>
