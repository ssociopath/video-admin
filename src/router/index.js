import Vue from 'vue'
import VueRouter from 'vue-router'
import { adminLoginInfo } from '@/api/user'

import Login from '@/views/login/login.vue'
import AdminHome from '@/views/admin/home/index.vue'
import AdminLayout from '@/views/admin/layout/index.vue'
import AdminMember from '@/views/admin/member/index.vue'
import AdminVideo from '@/views/admin/video/index.vue'
import AdminRent from '@/views/admin/rent/index.vue'
import AdminBill from '@/views/admin/bill/index.vue'
import UserLayout from '@/views/user/layout/index.vue'
import RentCenter from '../views/user/rent/index.vue'
import ReturnCenter from '../views/user/return/index.vue'
import PersonalCenter from '@/views/user/personal/index.vue'

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
      },
      {
        path: '/adminHome/video',
        name: 'adminVideo',
        component: AdminVideo
      },
      {
        path: '/adminHome/rent',
        name: 'adminRent',
        component: AdminRent
      },
      {
        path: '/adminHome/bill',
        name: 'adminRent',
        component: AdminBill
      }
    ]
  },
  {
    path: '/rent',
    name: 'home',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'rentCenter',
        component: RentCenter
      },
      {
        path: '/return',
        name: 'returnCenter',
        component: ReturnCenter
      },
      {
        path: '/personal',
        name: 'personalCenter',
        component: PersonalCenter
      }
    ]
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
