import request from '@/utils/request'

export async function getList({ pageSize, pageNum }) {
  return request({
    url: `web/Permission/getRoleList?pageSize=${pageSize}&pageNum=${pageNum}`,
    method: 'get',
  })
}

export async function getDetail(id) {
  return request({
    url: `web/Permission/getRole/${id}`,
    method: 'get',
  })
}

export async function deletePaper(id) {
  return request({
    url: `web/webUser/deleteUser/${id}`,
    method: 'delete',
  })
}
export async function editPaper(data) {
  return request({
    url: 'web/Permission/updateRole',
    method: 'put',
    data,
  })
}
export async function addPaperr(data) {
  return request({
    url: 'web/Permission/saveRole',
    method: 'post',
    data,
  })
}
