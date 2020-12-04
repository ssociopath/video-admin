import Vue from 'vue'
import VueRouter from 'vue-router'
import { adminLoginInfo } from '@/api/user'

import Login from '@/views/login/login.vue'
import Home from '@/views/home/index.vue'
import AdminHome from '@/views/admin/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/adminHome',
    name: 'adminHome',
    component: AdminHome
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (to.path === '/') return next()
  // TODO 查询页面
  if (to.path === '/adminHome') {
    if (from.path === '/login') next()
    adminLoginInfo().then(res => {
      if (res.data.code === '00000') return next()
      else next('/login')
    }).catch(error => {
      console.log(error)
    })
  }
})

export default router
