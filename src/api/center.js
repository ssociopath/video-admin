import request from '@/utils/request'
import qs from 'qs'

export const userRent = datas => {
  return request({
    method: 'POST',
    url: '/center/rent',
    data: qs.stringify(datas)
  })
}

export const userReturn = datas => {
  return request({
    method: 'POST',
    url: '/center/return',
    data: qs.stringify(datas)
  })
}

export const userPay = datas => {
  return request({
    method: 'POST',
    url: '/center/pay',
    data: qs.stringify(datas)
  })
}
