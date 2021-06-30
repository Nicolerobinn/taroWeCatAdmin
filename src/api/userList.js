import request from '@/utils/request'
export async function getUserList({ pageSize, pageNum, searchInput, gender }) {
  return request({
    url: `web/appUser/getUserList?pageSize=${pageSize}&pageNum=${pageNum}&searchInput=${searchInput}&gender=${gender}`,
    method: 'get',
  })
}
