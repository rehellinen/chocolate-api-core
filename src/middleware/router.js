/**
 *  router.js
 *  Create By rehellinen
 *  Create On 2018/10/25 20:37
 */
import Router from 'koa-router'
import { rRoot } from '../utils'
import { routerMap } from '../router'
import { config } from '../class'

export default app => {
  const router = new Router()
  // 执行路由文件
  const routerPath = rRoot(config.get('dir.module').app, 'router.js')
  require(routerPath)

  // 生成路由
  for (const routerConf of routerMap.values()) {
    const { method, url, action } = routerConf

    router[method](url, action)
  }

  // router.use((ctx) => {
  //   console.log(123)
  // })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
