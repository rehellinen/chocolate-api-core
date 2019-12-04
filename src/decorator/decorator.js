/**
 *  validate.js
 *  Create By rehellinen
 *  Create On 2018/10/12 21:24
 */
import { config, Token } from '../class'
import { getMapKey, routerMap } from './router'
import { TokenException } from '../exception'

export const auth = (scope) => {
  const scopeEnum = config.getConfig('token.scope')
  let flag = false
  for (const value of Object.values(scopeEnum)) {
    if (scope === value) {
      flag = true
    }
  }
  // 输入为空
  if (!scope) {
    scope = scopeEnum.USER
  }
  // 输入的值非法
  if (!flag) {
    throw new TokenException({
      message: '@auth装饰器输入值非法！'
    })
  }
  return middleware(async (ctx, next) => {
    Token.checkScope(ctx, scope)
    await next()
  })
}

export const middleware = (middleware) => {
  return (target, key, descriptor) => {
    const mapKey = getMapKey(target, key, descriptor)
    routerMap
      .get(mapKey)
      .actions
      .unshift(middleware)
  }
}
