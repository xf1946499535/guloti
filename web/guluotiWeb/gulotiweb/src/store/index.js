import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: null, //表示现在登录的用户
    noreadnum: 0, //当前未读信息
    myroutes: [] //当前可访问的sidebar
  },
  getters: {
    //获取当前登录用户
    getme(state) {
      return state.me
    },
    getnoreadnum(state) {
      return state.noreadnum
    },
    getmyroutes(state) {
      return state.myroutes
    }
  },
  mutations: {
    //设置当前登录用户
    setme(state, me) {
      state.me = me
    },
    setnoreadnum(state, noreadnum) {
      state.noreadnum = noreadnum
    },
    setmyroutes(state, routes) {
      state.myroutes = routes
    }
  },
  actions: {},
  modules: {}
})