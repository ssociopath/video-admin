import request from '@/utils/request.js'
import qs from 'qs'

export const getMembers = () => {
  return request({
    method: 'GET',
    url: '/member/findAll'
  })
}

export const setMember = datas => {
  return request({
    method: 'POST',
    url: '/member/set',
    data: qs.stringify(datas)
  })
}

export const addMember = datas => {
  return request({
    method: 'POST',
    url: '/member/add',
    data: qs.stringify(datas)
  })
}

export const deleteMember = datas => {
  return request({
    method: 'POST',
    url: '/member/delete',
    data: qs.stringify(datas)
  })
}
