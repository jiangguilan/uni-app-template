import { sync } from "glob";
import utils from '@/utils/common'

const TOKEN_STORAGE_KEY = 'CLIENT_TOKEN'

function setToken(token) {
	console.log(token)
	return new Promise((resolve, reject) => {
		uni.setStorage({
			key: TOKEN_STORAGE_KEY,
			data: token,
			success: function (res) {
				resolve(res)
			},
			fail: function (error) {
				reject(error)
			}
		})
	})
}

async function getToken() {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: TOKEN_STORAGE_KEY,
			success: function (res) {
				resolve(res.data)
			},
			fail: function (error) {
				resolve(error.data)
			}
		})
	})
}

function getTokenSync() {
	return uni.getStorageSync(TOKEN_STORAGE_KEY);
}

function removeToken() {
	return new Promise((resolve, reject) => {
		uni.removeStorage({
			key: TOKEN_STORAGE_KEY,
			success: function (res) {
				resolve(res)
			},
			fail: function (error) {
				reject(error)
			}
		})
	})
}

async function isTokenValid(token) {
	// TODO: 后端应该提供判断token是否有效的接口
	
	return new Promise((resolve, reject) => {
		uni.request({
			url:process.env.VUE_APP_BASE_URL + '/appsystem/getAdminUser',
			header: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			method: "GET",
			dataType: "json",
			/* 如设为json，会对返回的数据做一次 JSON.parse */
			responseType: "text",
			data: {},
			params: {},
			header: {
				"Authorization": `Bearer ${token}` //自定义请求头信息
			},
			success: (res) => {
				if ([40300, 40301, 40302, 40304, 40700].indexOf(res.data.code) !== -1) {
					// 重新登录
					resolve(false)
				} else {
					resolve(true)
				}
			},
			fail: (err) => {
				resolve(false)
			}
		});
	})
}

export {
	setToken,
	getToken,
	getTokenSync,
	removeToken,
	isTokenValid
}
