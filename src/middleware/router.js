/**
 *  router.js
 *  Create By rehellinen
 *  Create On 2018/10/25 20:37
 */
import Router from 'koa-router'
import { rRoot } from '../utils'
import { orderedRouterMap } from '../router'
import { getConfig } from '../class'

export const router = app => {
  const router = new Router()
  // 执行路由文件
  const routerPath = rRoot(getConfig('dir.module').app, 'router.js')
  require(routerPath)

  // 生成路由
  for (const routerConf of orderedRouterMap.values()) {
    const { method, url, action } = routerConf
    router[method](url, ...action)
  }

  app.use(router.routes())
  app.use(router.allowedMethods())
}
