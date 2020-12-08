import request from '@/utils/request.js'
import qs from 'qs'

export const getVideos = () => {
  return request({
    method: 'GET',
    url: '/video/findAll'
  })
}

export const editVideo = datas => {
  return request({
    method: 'POST',
    url: '/video/update',
    data: qs.stringify(datas)
  })
}

export const addVideo = datas => {
  return request({
    method: 'POST',
    url: '/video/add',
    data: qs.stringify(datas)
  })
}

export const deleteVideo = datas => {
  return request({
    method: 'POST',
    url: '/video/delete',
    data: qs.stringify(datas)
  })
}

export const getCopies = () => {
  return request({
    method: 'GET',
    url: '/copy/findAll'
  })
}

export const editCopy = datas => {
  return request({
    method: 'POST',
    url: '/copy/update',
    data: qs.stringify(datas)
  })
}

export const addCopy = datas => {
  return request({
    method: 'POST',
    url: '/copy/add',
    data: qs.stringify(datas)
  })
}

export const deleteCopy = datas => {
  return request({
    method: 'POST',
    url: '/copy/delete',
    data: qs.stringify(datas)
  })
}
