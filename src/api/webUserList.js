import request from '@/utils/request'

export async function getList({ pageSize, pageNum }) {
  return request({
    url: `web/webUser/userList?pageSize=${pageSize}&pageNum=${pageNum}`,
    method: 'get',
  })
}
export async function deleteUser(id) {
  return request({
    url: `web/webUser/deleteUser/${id}`,
    method: 'delete',
  })
}
export async function editUser(data) {
  return request({
    url: 'web/webUser/updateUser',
    method: 'post',
    data,
  })
}
export async function addUser(data) {
  return request({
    url: 'web/webUser/saveUser',
    method: 'post',
    data,
  })
}
export async function getAllRole() {
  return request({
    url: 'web/webUser/roleList',
    method: 'get',
  })
}
