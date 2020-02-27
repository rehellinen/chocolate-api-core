/**
 *  router.js
 *  Create By rehellinen
 *  Create On 2018/10/25 20:37
 */
import server from 'koa-static-server'
import { rRoot } from '../utils'

export const staticServer = app => {
  app.use(server({
    rootDir: rRoot('upload')
  }))
}
