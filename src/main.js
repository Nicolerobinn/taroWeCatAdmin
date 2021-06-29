import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'



/**
 * @author cxt （不想保留author可删除）
 * @description vue自定义指令检查权限
 * @param value
 * @returns {boolean}
 */
Vue.directive('permission', {
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
 * @description 生产环境默认都使用mock，如果正式用于生产环境时，记得去掉
 */

Vue.config.productionTip = false

new Vue({
  el: '#vue-admin',
  router,
  store,
  render: (h) => h(App),
})
