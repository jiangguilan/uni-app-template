import http from '@/common/http'

const center = {
  // 用户信息
  getAdminUser (data) {
    return http.request({
      url: '/appsystem/getAdminUser',
      method: 'get',
      data: data
    })
  },
  // 获取验证码
  getCode (data) {
    return http.request({
      url: '/getCode',
      method: 'get',
      data: data
    })
  },
  // 修改昵称
  updateAdminFullname (data) {
    return http.request({
      url: '/appsystem/updateAdminFullname',
      method: 'POST',
      data: data
    })
  },
  getNewCode (data) {
    return http.request({
      url: '/appsystem/sendNewPhoneCode',
      method: 'POST',
      data: data
    })
  },
  // 验证原手机号码
  checkOriginalPhone (data) {
    return http.request({
      url: '/appsystem/checkOriginalPhone',
      method: 'POST',
      data: data
    })
  },
  // 修改新手机号码
  checkNewPhone (data) {
    return http.request({
      url: '/appsystem/checkNewPhone',
      method: 'POST',
      data: data
    })
  }
}

export default center
