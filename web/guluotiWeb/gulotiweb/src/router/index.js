import Vue from 'vue'
import VueRouter from 'vue-router'

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