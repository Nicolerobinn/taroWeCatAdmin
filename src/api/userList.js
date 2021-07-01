import request from '@/utils/request'
export async function getUserList({ pageSize, pageNum, searchInput, gender }) {
  return request({
    url: `web/appUser/getUserList?pageSize=${pageSize}&pageNum=${pageNum}&searchInput=${searchInput}&gender=${gender}`,
    method: 'get',
  })
}
export async function getTagNews({ pageSize, pageNum, type, userId }) {
  return request({
    url: `web/appUser/getTagNews?pageSize=${pageSize}&pageNum=${pageNum}&type=${type}&userId=${userId}`,
    method: 'get',
  })
}
export async function getScore({ pageSize, pageNum, type, userId }) {
  return request({
    url: `web/appUser/getScore?pageSize=${pageSize}&pageNum=${pageNum}&type=${type}&userId=${userId}`,
    method: 'get',
  })
}
