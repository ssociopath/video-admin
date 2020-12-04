import request from '@/utils/request.js'
import qs from 'qs'

export const adminLogin = datas => {
  return request({
    method: 'POST',
    url: '/admin/login',
    data: qs.stringify(datas)
  })
}

export const adminLoginInfo = () => {
  return request({
    method: 'GET',
    url: '/admin/getLoginInfo'
  })
}
