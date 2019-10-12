import Vue from 'vue'
import App from './App'
import store from './store'
import common from '@/utils/common.js'
// 接口
import api from '@/api/api'
import login from './permission'

import ConfirmDialog from '@/components/common/ConfirmDialog'
import NavTab from '@/components/common/NavTab'
import { choose_and_upload } from '@/utils/uploadImg.js'

Vue.component('confirm-dialog', ConfirmDialog)
Vue.component('nav-tab', NavTab)

Vue.config.productionTip = false
Vue.prototype.imgURL = process.env.VUE_APP_BASE_URL
Vue.prototype.$store = store
Vue.prototype.$login = login

Vue.prototype.$choose_and_upload = choose_and_upload

Vue.prototype.$go = common.go
Vue.prototype.$back = common.back
Vue.prototype.$toTabBar = common.toTabBar
Vue.prototype.$redirectTo = common.redirectTo
Vue.prototype.$calculate = common.calculate
Vue.prototype.$wxPay = common.wxPay
Vue.prototype.$multiply100 = common.multiply100
Vue.prototype.$urlEncode = common.urlEncode
Vue.prototype.$combineObject = common.combineObject
Vue.prototype.$getNowDate = common.getNowDate
Vue.prototype.$fullDownRefreshCtr = common.fullDownRefreshCtr
Vue.prototype.$loadFun = common.loadFun

Vue.prototype.$api = api
// 执行初始化函数
// initFun(store)

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
