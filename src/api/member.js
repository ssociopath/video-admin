import request from '@/utils/request.js'
import qs from 'qs'

export const memberLogin = datas => {
  return request({
    method: 'POST',
    url: '/member/login',
    data: qs.stringify(datas)
  })
}

export const memberLoginInfo = () => {
  return request({
    method: 'GET',
    url: '/member/getLoginInfo'
  })
}

export const getMembers = () => {
  return request({
    method: 'GET',
    url: '/member/findAll'
  })
}

export const editMember = datas => {
  return request({
    method: 'POST',
    url: '/member/update',
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
