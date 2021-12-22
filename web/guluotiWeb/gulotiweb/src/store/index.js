import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: null //表示现在登录的用户
  },
  getters: {
    //获取当前登录用户
    getme(state) {
      return state.me
    },
  },
  mutations: {
    //设置当前登录用户
    setme(state, me) {
      state.me = me
    }
  },
  actions: {},
  modules: {}
})