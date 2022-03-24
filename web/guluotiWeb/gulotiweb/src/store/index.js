import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: null, //表示现在登录的用户
    noreadnum: 0 //当前未读信息
  },
  getters: {
    //获取当前登录用户
    getme(state) {
      return state.me
    },
    getnoreadnum(state) {
      return state.noreadnum
    },
  },
  mutations: {
    //设置当前登录用户
    setme(state, me) {
      state.me = me
    },
    setnoreadnum(state, noreadnum) {
      state.noreadnum = noreadnum
    }
  },
  actions: {},
  modules: {}
})