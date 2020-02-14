import { normalizePath, orderedRouterMap } from './utils'

export const prefix = (prefixStr, routerKeys) => {
  routerKeys = Array.prototype.concat.apply([], routerKeys)
  routerKeys.forEach(key => {
    const config = orderedRouterMap.get(key)
    config && (config.url = normalizePath(prefixStr) + config.url)
  })
}
