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
    }]
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

export default router