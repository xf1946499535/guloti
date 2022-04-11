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
        meta: {
          title: '首页',
          sidebar: true,
          require_login: false,
          icon: 'el-icon-menu',
          limits: ['admin', 'store', 'normal']
        }
      },
      {
        path: '/news_show',
        name: 'news_show',
        component: () => import( /* webpackChunkName: "about" */ '../views/dashboard/components/news_show.vue'),
        meta: {
          title: '新闻',
          sidebar: false,
          require_login: false,
          icon: '',
          limits: ['admin', 'store', 'normal']
        }
      }, {
        path: '/carstore',
        name: 'carstore',
        component: () => import( /* webpackChunkName: "about" */ '../views/carstore/carstore.vue'),
        meta: {
          title: '选车',
          sidebar: true,
          require_login: false,
          icon: 'el-icon-discount',
          limits: ['admin', 'normal']
        }
      }, {
        path: '/carbuy',
        name: 'carbuy',
        component: () => import( /* webpackChunkName: "about" */ '../views/carstore/carbuy.vue'),
        meta: {
          title: '汽车详情',
          sidebar: false,
          require_login: false,
          icon: '',
          limits: ['admin', 'normal']
        }
      },
      {
        path: '/barn',
        name: 'barn',
        component: () => import( /* webpackChunkName: "about" */ '../views/barn/barn.vue'),
        meta: {
          title: '车库',
          sidebar: true,
          require_login: true,
          icon: 'el-icon-s-home',
          limits: ['admin', 'normal']
        }
      },
      {
        path: '/oldcar',
        name: 'oldcar',
        component: () => import( /* webpackChunkName: "about" */ '../views/oldcar/oldcar.vue'),
        meta: {
          title: '二手车',
          sidebar: true,
          require_login: false,
          icon: 'el-icon-price-tag',
          limits: ['admin', 'normal']
        }
      },
      {
        path: '/oldcarbuy',
        name: 'oldcarbuy',
        component: () => import( /* webpackChunkName: "about" */ '../views/oldcar/oldcarbuy.vue'),
        meta: {
          title: '二手车购买',
          sidebar: false,
          require_login: false,
          icon: '',
          limits: ['admin', 'normal']
        }
      },
      {
        path: '/club',
        name: 'club',
        component: () => import( /* webpackChunkName: "about" */ '../views/club/club.vue'),
        meta: {
          title: '车友会',
          sidebar: true,
          require_login: false,
          icon: 'el-icon-s-help',
          limits: ['admin', 'store', 'normal']
        }
      },
      {
        path: '/forum',
        name: 'forum',
        component: () => import( /* webpackChunkName: "about" */ '../views/club/forum.vue'),
        meta: {
          title: '无',
          sidebar: false,
          require_login: true,
          icon: '',
          limits: ['admin', 'store', 'normal']
        }
      },
      {
        path: '/invitation',
        name: 'invitation',
        component: () => import( /* webpackChunkName: "about" */ '../views/club/invitation.vue'),
        meta: {
          title: '讨论',
          sidebar: false,
          require_login: true,
          icon: '',
          limits: ['admin', 'store', 'normal']
        }
      },
      {
        path: '/chatroom',
        name: 'chatroom',
        redirect: '/chatroom/chatuser',
        component: () => import( /* webpackChunkName: "about" */ '../views/chatroom/chatroom.vue'),
        meta: {
          title: '聊天',
          sidebar: true,
          require_login: true,
          icon: 'el-icon-s-comment',
          limits: ['admin', 'store', 'normal']
        },
        children: [{
          path: '/chatroom/chatuser',
          name: '/chatroom/chatuser',
          component: () => import( /* webpackChunkName: "about" */ '../views/chatroom/component/chatuser.vue'),
        }]
      }, {
        path: '/ctnews',
        name: 'ctnews',
        component: () => import( /* webpackChunkName: "about" */ '../views/ctnews/ctnews.vue'),
        meta: {
          title: '资讯管理',
          sidebar: true,
          require_login: true,
          icon: 'el-icon-setting',
          limits: ['admin']
        },
      },
      {
        path: '/ctcars',
        name: 'ctcars',
        component: () => import( /* webpackChunkName: "about" */ '../views/ctcars/ctcars.vue'),
        meta: {
          title: '车辆管理',
          sidebar: true,
          require_login: true,
          icon: 'el-icon-setting',
          limits: ['store']
        },
      },
      {
        path: '/aboutme',
        name: 'aboutme',
        component: () => import( /* webpackChunkName: "about" */ '../views/aboutme/aboutme.vue'),
        meta: {
          title: '我的',
          sidebar: true,
          require_login: true,
          icon: 'el-icon-user-solid',
          limits: ['admin', 'store', 'normal']
        }
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