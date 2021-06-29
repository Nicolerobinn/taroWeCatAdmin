/**
 * @author cxt （不想保留author可删除）
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import VabProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/pageTitle'
import {
  progressBar,
  recordRoute,
  routesWhiteList,
} from '@/config'

VabProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})
router.beforeResolve(async (to, from, next) => {
  if (progressBar) VabProgress.start()
  let hasToken = store.getters['user/accessToken']

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      if (progressBar) VabProgress.done()
    } else {
      const perList = store.getters['user/permissions'] ?? []
      const hasPermissions =  perList.length > 0
      if (hasPermissions) {
        next()
      } else {
        await store.dispatch('user/resetAccessToken')
        Vue.prototype.$baseMessage('权限失效，请重新登录', 'error')
        if (recordRoute) {
          next(`/login?redirect=${to.path}`)
        } else {
          next('/login')
        }
        if (progressBar) VabProgress.done()
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (recordRoute) {
        next(`/login?redirect=${to.path}`)
      } else {
        next('/login')
      }

      if (progressBar) VabProgress.done()
    }
  }
  document.title = getPageTitle(to.meta.title)
})
router.afterEach(() => {
  if (progressBar) VabProgress.done()
})
