import store from '@/store'
import Vue from 'vue'

/**
 * @author cxt （不想保留author可删除）
 * @description vue自定义指令检查权限
 * @param value
 * @returns {boolean}
 */
export const checkVuePermission = Vue.directive('permission', {
  inserted(el, binding) {
    const {value} = binding
    const roles = store.getters['user/permissions']
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some(role =>permissionRoles.includes(role))
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('没有输入权限，默认全部开放')
    }
  },

})
/**
 * @author cxt （不想保留author可删除）
 * @description 函数式检查权限
 * @param value
 * @returns {boolean}
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const permissions = store.getters['user/permissions']
    const permissionPermissions = value

    return permissions.some((role) => {
      return permissionPermissions.includes(role)
    })
  } else {
    return false
  }
}
