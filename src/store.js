import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    uploadImg: []
  },
  getters: {
    userInfo: (state) => {
      return state.userInfo
    },
    uploadImg: (state) => {
      return state.uploadImg
    }
  },
  mutations: {
    SET_USER_INFO (state, userInfo) {
      state.userInfo = userInfo
    },
    SET_UPLOAD_IMG (state, uploadImg) {
      state.uploadImg = uploadImg
    }
  },
  actions: {
    async GetUserInfo ({ commit, state }, params) {
      return new Promise(async (resolve, reject) => {
        api.center.getAdminUser().then(res => {
          commit('SET_USER_INFO', res.data)
          resolve(res.data)
        })
      })
    }
  }
})
