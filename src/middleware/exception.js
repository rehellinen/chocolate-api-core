import { types } from '../utils'
import { config, Exception } from '../class'

export const exception = (app) => {
  const processError = (e, ctx) => {
    if (e instanceof Exception) {
      ctx.status = parseInt(e.httpCode)
      ctx.type = types.json
      ctx.body = e.getError()
      ctx.body.request = `${ctx.method} ${ctx.url}`
    } else {
      if (config.get('debug')) {
        console.log(e)
        ctx.status = 500
        ctx.type = types.json
        ctx.body = {
          status: 500,
          message: e.toString(),
          request: `${ctx.method} ${ctx.url}`
        }
      } else {
        ctx.body = '服务器内部错误'
      }
    }
  }

  const exceptionHandler = async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      processError(e, ctx)
    }
  }
  app.use(exceptionHandler)
}
