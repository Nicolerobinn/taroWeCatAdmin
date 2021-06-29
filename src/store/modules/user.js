/**
 * @author cxt （不想保留author可删除）
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from 'vue'
import { login } from '@/api/user'
import { getStorage, removeStorage, setStorage } from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { title, tokenName, tokenTableName } from '@/config'

const state = () => ({
  accessToken: getStorage(tokenTableName),
  username: '',
  avatar: '',
  permissions: getStorage('router-code') || [],
})
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setStorage(tokenTableName, accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    const arr = permissions.map((e, i) => e.code)
    setStorage('router-code', arr)
    console.log(arr)
    state.permissions = arr
  },
}
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo)
    const { token, user } = data ?? {}
    console.log(token)
    const {
      nickname,
      webRole: { menuList },
    } = user ?? {}
    if (token) {
      commit('setPermissions', menuList)
      commit(
        'setAvatar',
        'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
      )
      commit('setUsername', nickname)
      commit('setAccessToken', token)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        `登录接口异常，未正确返回${tokenName}...`,
        'error'
      )
    }
  },
  async logout({ dispatch }) {
    await dispatch('resetAccessToken')
    await resetRouter()
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeStorage()
  },
}
export default { state, getters, mutations, actions }
