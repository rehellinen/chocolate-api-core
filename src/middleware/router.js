/**
 *  router.js
 *  Create By rehellinen
 *  Create On 2018/10/25 20:37
 */
import Router from 'koa-router'
import { rRoot, warn } from '../utils'
import { routerMap } from '../router'
import { config } from '../class'

export default app => {
  const router = new Router()
  // 执行路由文件
  const routerPath = rRoot(config.get('dir.module').app, 'router.js')
  require(routerPath)

  // 生成路由
  for (const [key, routerConf] of routerMap.entries()) {
    const { method, url, action } = routerConf

    if (!method || !url) {
      const [fileName, actionName] = key.split('.')
      warn(`${fileName}.js中的${actionName}方法没有定义相应的路由`)
      return
    }
    router[method](url, ...action)
  }

  app.use(router.routes())
  app.use(router.allowedMethods())
}
