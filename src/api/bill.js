import request from '@/utils/request.js'
import qs from 'qs'

export const getBills = () => {
  return request({
    method: 'GET',
    url: '/bill/findAll'
  })
}

export const getBillById = datas => {
  return request({
    method: 'POST',
    url: '/bill/getBill',
    data: qs.stringify(datas)
  })
}

export const getBillRecordById = datas => {
  return request({
    method: 'POST',
    url: '/bill/getBillRecord',
    data: qs.stringify(datas)
  })
}

export const getBillByMember = datas => {
  return request({
    method: 'POST',
    url: '/bill/findByMember',
    data: qs.stringify(datas)
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
