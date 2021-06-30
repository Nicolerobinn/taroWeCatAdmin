import request from '@/utils/request'
import { MD } from '@/utils/md5'
import { loginMD } from '@/config'

export async function login(data) {
  const { username, password } = data || {}
  let word = password
  if (loginMD) {
    word = await MD(password)
  }
  return request({
    url: 'web/webUser/login',
    method: 'post',
    data: { userName: username, password: word },
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
