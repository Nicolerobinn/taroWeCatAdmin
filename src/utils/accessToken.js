import { storage } from '@/config'

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 获取accessToken
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getAccessToken(str) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(str)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(str)
    } else {
      return localStorage.getItem(str)
    }
  } else {
    return localStorage.getItem(str)
  }
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(str, any) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(str, any)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(str, any)
    } else {
      return localStorage.setItem(str, any)
    }
  } else {
    return localStorage.setItem(str, any)
  }
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken(str) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(str)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else {
      return localStorage.removeItem(str)
    }
  } else {
    return localStorage.removeItem(str)
  }
}
