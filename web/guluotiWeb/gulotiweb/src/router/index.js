import Vue from 'vue'
import VueRouter from 'vue-router'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: '/',
    redirect: '/dashboard',
    component: () => import( /* webpackChunkName: "about" */ '../views/home/Home.vue'),
    children: [{
        path: '/dashboard',
        name: 'dashboard',
        component: () => import( /* webpackChunkName: "about" */ '../views/dashboard/dashboard.vue'),
      },
      {
        path: '/news_show',
        name: 'news_show',
        component: () => import( /* webpackChunkName: "about" */ '../views/dashboard/components/news_show.vue'),
      }, {
        path: '/carstore',
        name: 'carstore',
        component: () => import( /* webpackChunkName: "about" */ '../views/carstore/carstore.vue'),
      }, {
        path: '/carbuy',
        name: 'carbuy',
        component: () => import( /* webpackChunkName: "about" */ '../views/carstore/carbuy.vue'),
      },
      {
        path: '/aboutme',
        name: 'aboutme',
        component: () => import( /* webpackChunkName: "about" */ '../views/aboutme/aboutme.vue'),
      },
      {
        path: '/barn',
        name: 'barn',
        component: () => import( /* webpackChunkName: "about" */ '../views/barn/barn.vue'),
      },
      {
        path: '/oldcar',
        name: 'oldcar',
        component: () => import( /* webpackChunkName: "about" */ '../views/oldcar/oldcar.vue'),
      },
      {
        path: '/oldcarbuy',
        name: 'oldcarbuy',
        component: () => import( /* webpackChunkName: "about" */ '../views/oldcar/oldcarbuy.vue'),
      },
      {
        path: '/club',
        name: 'club',
        component: () => import( /* webpackChunkName: "about" */ '../views/club/club.vue'),
      },
      {
        path: '/forum',
        name: 'forum',
        component: () => import( /* webpackChunkName: "about" */ '../views/club/forum.vue'),
      },
      {
        path: '/invitation',
        name: 'invitation',
        component: () => import( /* webpackChunkName: "about" */ '../views/club/invitation.vue'),
      },
      {
        path: '/chatroom',
        name: 'chatroom',
        redirect: '/chatroom/chatuser',
        component: () => import( /* webpackChunkName: "about" */ '../views/chatroom/chatroom.vue'),
        children: [{
          path: '/chatroom/chatuser',
          name: '/chatroom/chatuser',
          component: () => import( /* webpackChunkName: "about" */ '../views/chatroom/component/chatuser.vue'),
        }]
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "about" */ '../views/login/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( /* webpackChunkName: "about" */ '../views/login/register.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  next()
  window.scrollTo(0, 0)
})

export default router