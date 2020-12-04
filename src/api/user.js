import request from '@/utils/request.js'
import qs from 'qs'

export const login = datas => {
  return request({
    method: 'POST',
    url: '/admin/login',
    data: qs.stringify(datas)
  })
}
