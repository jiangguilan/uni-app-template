import http from './interface'
import qs from 'qs'
import login from '@/permission'
import { getToken } from '@/common/token'

// param参数序列化
http.config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'indices' })
const whiteList = '/appsystem/login'
//设置请求前拦截器
http.interceptor.request = async (config) => {
	// 非匿名接口
	// 异步登陆
	if(config.url.indexOf(whiteList)==-1){
		await login()
	}
	if(!config.meta.anonymous && !config.header.Authorization) {
		// 获取token
		const token = await getToken()
		if(token) {
			config.header = {
				"Authorization": `Bearer ${token}`
			}
		}
	}
}
//设置请求结束后拦截器
http.interceptor.response = (response) => {
	const statusCode = response.statusCode
	const {
		code,
		data,
		msg
	} = response.data

	if(code === 40300) {
		login()
		return response
	}
	if (statusCode !== 200 || code !== 10000) {
		uni.showModal({
			title: '提示',
			content: msg || response.errMsg,
			cancelColor: '#98A4B4',
			showCancel: false,
			confirmColor: '#0C92F2',
			success: function(res) {
				if (res.confirm) {
					// console.log('confirm')
				}
			}
		});
	}

	//判断返回状态 执行相应操作
	return response.data;
}

export default http