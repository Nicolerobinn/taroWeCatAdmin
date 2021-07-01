import request from '@/utils/request'

export async function login(data) {
  return request({
    url: 'web/webUser/login',
    method: 'post',
    data,
  })
}
