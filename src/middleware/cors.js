/**
 *  cors.js
 *  Create By rehellinen
 *  Create On 2019/3/4 11:50
 */
import koaCors from 'koa2-cors'
import { config } from '../class'

export default app => {
  const corsConfig = config.get('cors')

  app.use(koaCors({
    origin: corsConfig.ORIGIN || '*',
    maxAge: corsConfig.MAX_AGE || 5,
    credentials: corsConfig.CREDENTIALS || true,
    exposeHeaders: corsConfig.EXPOSE_HEADERS ||
      ['WWW-Authenticate', 'Server-Authorization'],
    allowMethods: corsConfig.METHODS ||
      ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowHeaders: corsConfig.ALLOW_HEADERS ||
      ['Content-Type', 'Authorization', 'Accept', 'token', 'Content-Length', 'X-Requested-With']
  }))
}

