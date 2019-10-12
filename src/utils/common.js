function go (url) {
  uni.navigateTo({
    url: url,
    animationType: 'pop-in',
    animationDuration: 200
  })
}
function back (num = 1) {
  uni.navigateBack({
    delta: num,
    animationType: 'pop-out',
    animationDuration: 200
  })
}
function toTabBar (url) {
  uni.switchTab({
    url: url,
    animationType: 'pop-in',
    animationDuration: 200
  })
}
function redirectTo (url) {
  uni.redirectTo({
    url: url,
    animationType: 'pop-in',
    animationDuration: 200
  })
}
function calculate (curNum, action, min, max, interval, text) {
  var num = Number(curNum)
  if (action === 'reduce') {
    if (num <= min) {
      num = min
      if (num === min) {
        uni.showToast({
          title: text[0] + min + '桶',
          duration: 1000,
          icon: 'none'
        })
      }
    } else {
      num -= interval
      if (num <= 0) {
        num = min
      }
    }
  } else if (action === 'plus') {
    if (num >= max) {
      num = max
      if (num === max) {
        uni.showToast({
          title: text[1] + max + '桶',
          duration: 1000,
          icon: 'none'
        })
      }
    } else {
      num += interval
      if (num >= max) {
        num = max
      }
    }
  } else if (action === 'blur') {
    if (num <= min) {
      if (num < min) {
        uni.showToast({
          title: text[0] + min + '桶',
          duration: 1000,
          icon: 'none'
        })
      }
      num = min
    } else if (num >= max) {
      if (num > max) {
        uni.showToast({
          title: text[1] + max + '桶',
          duration: 1000,
          icon: 'none'
        })
      }
      num = max
    }
  }
  return num
}

function wxPay (data) {
  // 调用微信h5支付
  const that = this
  return new Promise((resolve, reject) => {
    // #ifdef H5
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        appId: data.appId, // 公众号名称，由商户传入
        timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
        nonceStr: data.nonceStr, // 随机串
        package: data.package,
        signType: data.signType, // 微信签名方式：
        paySign: data.paySign // 微信签名
      },
      function (res) {
        console.log(res)
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          resolve()
        } else {
          reject()
        }
      })
    // #endif

    // #ifndef H5
    // app,小程序有效
    uni.requestPayment({
      provider: 'wxpay',
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success: function (res) {
        // console.log('success:' + JSON.stringify(res));
        resolve()
      },
      fail: function (err) {
        // console.log('fail:' + JSON.stringify(err));
        reject()
      }
    })
    // #endif
  })
}

function getCurrentPage () {
  const pages = getCurrentPages()
  const length = pages.length < 0 ? pages.length : 1
  return pages[length - 1]
}

function getPlatform () {
  let platform
  // #ifdef H5
  platform = 'H5'
  // #endif

  // #ifdef MP-WEIXIN
  platform = 'MP-WEIXIN'
  // #endif

  // #ifdef APP-PLUS
  platform = 'APP-PLUS'
  // #endif
  return platform
}

function multiply100 (num) {
  return parseInt(parseFloat(num) * 100)
}

/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return URL参数字符串
 */
function urlEncode (param, key, encode) {
  if (param == null) return ''
  var paramStr = ''
  var t = typeof (param)
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}

/**
 *
 * @param {*} dataA 目标对象
 * @param {*} dataB source对象
 */
function combineObject (dataA, dataB) {
  const A = dataA
  const B = dataB
  for (var key in A) {
    A[key] = B[key]
  }
  return A
}

function getNowDate () {
  const now = new Date()
  return {
    y: now.getFullYear(),								// 年
    M: now.getMonth() + 1, // 月份
    d: now.getDate(), // 日
    h: now.getHours(), // 小时
    m: now.getMinutes(), // 分
    s: now.getSeconds(), // 秒
    q: Math.floor((now.getMonth() + 3) / 3), // 季度
    S: now.getMilliseconds() // 毫秒
  }
}

function fullDownRefreshCtr (val) {
  var pages = getCurrentPages()
  var page = pages[pages.length - 1]
  var currentWebview = page.$getAppWebview()
  if (val) {
    currentWebview.setStyle({
      pullToRefresh: {
        support: false,
        style: plus.os.name === 'Android' ? 'circle' : 'default'
      }
    })
  } else {
    currentWebview.setStyle({
      pullToRefresh: {
        support: true,
        style: plus.os.name === 'Android' ? 'circle' : 'default'
      }
    })
  }
}

function loadFun (flag) {
  if (flag) {
    uni.showLoading({
      title: '加载中'
    })
  } else {
    setTimeout(() => {
      uni.hideLoading()
    }, 300)
  }
}

export default {
  go,
  back,
  toTabBar,
  redirectTo,
  calculate,
  wxPay,
  getCurrentPage,
  getPlatform,
  multiply100,
  urlEncode,
  combineObject,
  getNowDate,
  fullDownRefreshCtr,
  loadFun
}
