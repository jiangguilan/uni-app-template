import {
  setToken,
  getTokenSync,
  isTokenValid
} from '@/common/token'

import jwt from 'jsonwebtoken'

import utils from '@/utils/common'

const loginStrategy = new Map([
  ['MP-WEIXIN', appLogin], // mpWeixinLogin
  ['H5', appLogin], // h5Login
  ['APP-PLUS', appLogin]
])

async function login ({
  reset
} = {}, loginData) {
  const platform = utils.getPlatform()

  if (!loginStrategy.has(platform)) {
    console.error('check permission failed get unexpected platform: ', platform)
    return Promise.reject(platform)
  }

  let token = getTokenSync()

  // 是否重新执行登陆
  if (reset) {
    getApp().globalData.loginPromise = null
    token = null
    await setToken(null)
  }
  const pages = getCurrentPages()
  // TODO: 考虑用户手机时间错误情况
  let checkTokenIsValid = true // true:token有效，不重新登录   false：token失效， 重新登录
  if (token) {
    if (jwt.decode(token).exp <= parseInt(new Date().getTime() / 1000)) {
      await isTokenValid(token).then(res => {
        checkTokenIsValid = res
      })
    }
  }

  // promise = 判断是否第一次加载页面是否登录过   checkTokenIsValid = 检测token是否失效
  /**
	 * !token 没有token直接登录
	 *     false              false                                                            是否重新登录
	 * loginPromise && checkTokenIsValid: false 没登录过，且token失效  （|| checkTokenIsValid）      是
	 *     true              false
	 * loginPromise && checkTokenIsValid: false 登录过，但token失效    （|| checkTokenIsValid）      是
	 *     false              true
	 * loginPromise && checkTokenIsValid: false 没登录，但token有效    （|| checkTokenIsValid）      否
	 *     true              true
	 * loginPromise && checkTokenIsValid: true  登录了，且token有效    （|| checkTokenIsValid）      否
	 */
  let loginPromise = getApp().globalData.loginPromise
  if ((loginPromise && checkTokenIsValid && token) || checkTokenIsValid && token) {
    return loginPromise
  }

  // 根据不同PLATFORM执行不同登陆函数

  loginPromise = loginStrategy.get(platform)(loginData)
  getApp().globalData.loginPromise = loginPromise
  token = await loginPromise
  console.log('check permission success with token: ', token)
  return token
}

/**
 * 小程序登陆
 */
async function mpWeixinLogin () {
  const codePromise = new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: res => {
        console.log('uni.login', res)
        resolve(res.code)
      },
      fail: error => {
        console.log('app login failed at uni.login(): ', error)
        reject(error)
      }
    })
  })

  const code = await codePromise

  const userInfoPromise = new Promise((resolve, reject) => {
    uni.getUserInfo({
      lang: 'zh_CN',
      success: res => {
        console.log('uni.getUserInfo', res)
        resolve(res)
      },
      fail: (error) => {
        reject({
          msg: error,
          type: 'getUserInfo'
        })
        console.log('app login failed at uni.getUserInfo(): ', error)
      }
    })
  })

  const userInfoResult = await userInfoPromise

  const {
    // 供后端解密的数据
    encryptedData,
    iv,
    // 用户基本信息
    userInfo
  } = { ...userInfoResult }

  const saveUserInfoPromise = new Promise((resolve, reject) => {
    // 保存用户信息至本地
    uni.setStorage({
      key: 'USER_INFO',
      data: userInfo,
      success: () => {
        resolve()
      },
      fail: (error) => {
        console.log('app login failed when set userInfo to storage: ', error)
        reject(error)
      }
    })
  })

  const tokenPromise = new Promise((resolve, reject) => {
    uni.request({
      url: process.env.VUE_APP_BASE_URL + '/wechat/wechat_user/miniOauth2',
      method: 'POST',
      data: {
        auth_type: 'wechat_mini',
        code,
        encryptedData,
        iv
      },
      success: res => {
        res = res.data
        if ((res && res.code) === 10000) {
          resolve(res.data && res.data.token)
        } else {
          reject(res)
          console.log('app login failed when request for token, getting response: ', res)
        }
      },
      fail: error => {
        console.log('app login failed when request for token: ', error)
        reject(error)
      }
    })
  })

  const token = await tokenPromise
  await setToken(token)
  await saveUserInfoPromise

  return token
}

/**
 * H5登陆
 */
async function h5Login (loginData) {
  const route = utils.getCurrentPage().$route
  // 获取token参数(适配token参数在hash前和hash后的情况)
  const token = new URLSearchParams(
    document.location.search.substring(1)
  ).get('token') || route.query.token

  if (token) {
    // 路由重定向回到网页携带token，存储token
    await setToken(token)
    return token
  }

  // 页面跳转到微信登陆页面
  window.location.href = process.env.VUE_APP_BASE_URL +
		'/wechat/wechat_user/login?redirect_uri=' +
		process.env.VUE_APP_BASE_URL +
		'/front/#/'
}

// app登陆
async function appLogin (loginData) {
  const page = utils.getCurrentPage()
  console.log(page)
  if (page.route !== 'pages/login/index') {
    utils.redirectTo('/pages/login/index')
  }
}
export default login
