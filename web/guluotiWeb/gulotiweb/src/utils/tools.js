import routes from '@/router'
import store from '@/store'
//防抖
export function debounce(fn, wait) {
  let timeout = null;
  wait = wait || 600;
  return function () {
    let that = this;
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(that);
    }, wait);
  }
}
//设置可访问路由
export function filtrouters() {
  let myroutes = routes.options.routes[0].children
  if (store.getters.getme) {
    let usertype = store.getters.getme.usertype
    myroutes = myroutes.filter(function (item) {
      return item.meta.sidebar && item.meta.limits.includes(usertype)
    })
  } else {
    myroutes = myroutes.filter(function (item) {
      return item.meta.sidebar && !item.meta.require_login
    })
  }
  store.commit('setmyroutes', myroutes)
  console.log(store.getters.getmyroutes);
}