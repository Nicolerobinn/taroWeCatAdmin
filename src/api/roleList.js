import request from '@/utils/request'

export async function getList({ pageSize, pageNum }) {
  return request({
    url: `web/Permission/getRoleList?pageSize=${pageSize}&pageNum=${pageNum}`,
    method: 'get',
  })
}

export async function userDetail(id) {
  return request({
    url: `web/Permission/getRole/${id}`,
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
    url: 'web/Permission/updateRole',
    method: 'put',
    data,
  })
}
export async function addUser(data) {
  return request({
    url: 'web/Permission/saveRole',
    method: 'post',
    data,
  })
}
export async function getTree() {
  return request({
    url: 'web/Permission/getMenuTree',
    method: 'get',
  })
}
