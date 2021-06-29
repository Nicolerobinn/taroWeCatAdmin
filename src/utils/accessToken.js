import { storage } from '@/config'

/**
 * @author cxt （不想保留author可删除）
 * @description 操作本地存储
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getStorage(str) {
  let json
  if (storage) {
    if ('localStorage' === storage) {
      json = localStorage.getItem(str)
    } else if ('sessionStorage' === storage) {
      json = sessionStorage.getItem(str)
    } else {
      json = localStorage.getItem(str)
    }
  } else {
    json = localStorage.getItem(str)
  }
  if (json) {
    try {
      return JSON.parse(json)
    } catch (error) {
      return json
    }
  }
}

/**
 * @author cxt （不想保留author可删除）
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setStorage(str, any = '') {
  const json = JSON.stringify(any)
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(str, json)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(str, json)
    } else {
      return localStorage.setItem(str, json)
    }
  } else {
    return localStorage.setItem(str, json)
  }
}

/**
 * @author cxt （不想保留author可删除）
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeStorage(str) {
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
