import request from '@/utils/request.js'
import qs from 'qs'

export const getVideoId = () => {
  return request({
    method: 'GET',
    url: '/video/ids'
  })
}

export const getCopyId = datas => {
  return request({
    method: 'POST',
    url: '/copy/ids',
    data: qs.stringify(datas)
  })
}

export const getAvailableCopyId = datas => {
  return request({
    method: 'POST',
    url: '/copy/available/ids',
    data: qs.stringify(datas)
  })
}

export const getMemberId = () => {
  return request({
    method: 'GET',
    url: '/member/ids'
  })
}
