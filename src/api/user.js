import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

export async function login(data) {
  const { username, password } = data || {}
  let word = password
  if (loginRSA) {
    const res = await encryptedData(password)
    word = res.param
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
