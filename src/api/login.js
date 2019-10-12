import http from '@/common/http'

const login = {
  // 用户中心
  passLogin (data) {
    return http.request({
      url: '/appsystem/login',
      method: 'post',
      data: data
    })
  }

}

export default login
