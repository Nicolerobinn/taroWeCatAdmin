/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/paperManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'PaperManagement',
    meta: { title: '新闻管理', icon: 'users-cog', permissions: '01' },
    children: [
      {
        path: 'paperList',
        name: 'PaperList',
        component: () => import('@/views/paperManagement/paperList/index'),
        meta: { title: '新闻列表', permissions: '0101' },
      },
      {
        path: 'addPaper',
        name: 'AddPaper',
        component: () => import('@/views/paperManagement/addPaper/index'),
        meta: { title: '新增新闻', permissions: '010102' },
        hidden: true,
      },
      {
        path: 'editorPaper/:id',
        name: 'EditorPaper',
        component: () => import('@/views/paperManagement/editorPaper/index'),
        meta: { title: '编辑新闻', permissions: '010103' },
        hidden: true,
      },
    ],
  },
  {
    path: '/userManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'UserManagement',
    meta: { title: '用户管理', icon: 'users-cog', permissions: '02' },
    children: [
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/userManagement/userList/index'),
        meta: { title: '用户列表', permissions: '0201' },
      },
    ],
  },
  {
    path: '/taroManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'TaroManagement',
    meta: { title: '小程序用户管理', icon: 'users-cog', permissions: '08' },
    children: [
      {
        path: 'taroList',
        name: 'TaroList',
        component: () => import('@/views/taroManagement/taroList/index'),
        meta: { title: '小程序用户列表', permissions: '0801' },
      },
    ],
  },
  {
    path: '/authorityManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'AuthorityManagement',
    meta: { title: '权限管理', icon: 'users-cog', permissions: '03' },
    children: [
      {
        path: 'roleList',
        name: 'RoleList',
        component: () => import('@/views/authorityManagement/roleList/index'),
        meta: { title: '角色列表', permissions: '0301' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
