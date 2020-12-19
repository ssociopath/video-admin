import request from '@/utils/request.js'
import qs from 'qs'

export const getBill = () => {
  return request({
    method: 'GET',
    url: '/bill/findAll'
  })
}

export const editBill = datas => {
  return request({
    method: 'POST',
    url: '/bill/update',
    data: qs.stringify(datas)
  })
}

export const addBill = datas => {
  return request({
    method: 'POST',
    url: '/bill/add',
    data: qs.stringify(datas)
  })
}

export const deleteBill = datas => {
  return request({
    method: 'POST',
    url: '/bill/delete',
    data: qs.stringify(datas)
  })
}
