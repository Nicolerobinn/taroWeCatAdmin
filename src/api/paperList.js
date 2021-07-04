import request from '@/utils/request'

export async function getList({ pageSize, pageNum, searchInput }) {
  return request({
    url: `web/news/newsList?pageSize=${pageSize}&pageNum=${pageNum}&searchInput=${searchInput}`,
    method: 'get',
  })
}

export async function getDetail(id) {
  return request({
    url: `web/news/getOne/${id}`,
    method: 'get',
  })
}

export async function deletePaper(id) {
  return request({
    url: `web/news/deleteNews/${id}`,
    method: 'delete',
  })
}
export async function editPaper(data) {
  return request({
    url: 'web/news/update',
    method: 'put',
    data,
  })
}
export async function addPaper(data) {
  return request({
    url: 'web/news/saveOne',
    method: 'post',
    data,
  })
}

export async function getChannel() {
  return request({
    url: 'web/news/getChannel',
    method: 'get',
  })
}

export async function uploadFile(data) {
  return request({
    url: 'web/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
}
