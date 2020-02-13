import { routerMap } from '../router'

/**
 * 增加一个中间件到路由中
 * @param middleware 中间件函数
 * @returns {Function}
 */
export const middleware = (middleware) => {
  return (target, key, descriptor) => {
    const mapKey = target.constructor.name + '.' + key
    let routerConf = routerMap.get(mapKey)
    if (!routerConf) {
      routerConf = {}
      routerMap.set(mapKey, routerConf)
    }

    let action = routerConf.action
    action
      ? Array.isArray(action)
        ? action.unshift(middleware)
        : action = [action, middleware]
      : routerConf.action = [middleware]
  }
}
