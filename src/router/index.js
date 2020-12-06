import Vue from 'vue'
import VueRouter from 'vue-router'
import { adminLoginInfo } from '@/api/user'

import Login from '@/views/login/login.vue'
import Home from '@/views/home/index.vue'
import AdminHome from '@/views/admin/home/index.vue'
import AdminLayout from '@/views/admin/layout/index.vue'
import AdminMember from '@/views/admin/member/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/adminHome',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'adminHome',
        component: AdminHome
      },
      {
        path: '/adminHome/member',
        name: 'adminMember',
        component: AdminMember
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // TODO 查询页面
  if (to.path.substring(0, 10) === '/adminHome') {
    if (from.path === '/login') return next()
    if (from.path.substring(0, 10) === '/adminHome') return next()
    adminLoginInfo().then(res => {
      if (res.data.code === '00000') return next()
      else return next('/login')
    }).catch(error => {
      console.log(error)
      return next('/login')
    })
  }
  return next()
})

export default router
