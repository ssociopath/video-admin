import request from '@/utils/request.js'
import qs from 'qs'

export const getRent = () => {
  return request({
    method: 'GET',
    url: '/rent/findAll'
  })
}

export const editRent = datas => {
  return request({
    method: 'POST',
    url: '/rent/update',
    data: qs.stringify(datas)
  })
}

export const addRent = datas => {
  return request({
    method: 'POST',
    url: '/rent/add',
    data: qs.stringify(datas)
  })
}

export const deleteRent = datas => {
  return request({
    method: 'POST',
    url: '/rent/delete',
    data: qs.stringify(datas)
  })
}
