import { MethodNotAllowed, UrlNotFound } from '../exception'


export const response = app => {
  app.use(async (ctx, next) => {
    await next()
    if (!ctx.body) {
      if (Number.parseInt(ctx.status) === 404) {
        throw new UrlNotFound()
      }

      if (Number.parseInt(ctx.status) === 405) {
        throw new MethodNotAllowed()
      }
    }
  })
}
