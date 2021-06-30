import md5 from 'js-md5'

/**
 * @author cxt （不想保留author可删除）
 * @description MD5加密
 * @param data
 * @returns {Promise<{param: PromiseLike<ArrayBuffer>}|*>}
 */
export async function MD(data) {
  return md5(data)
}
