/**
 *  validate.js
 *  Create By rehellinen
 *  Create On 2018/10/12 21:24
 */
import { getMapKey, routerMap } from './router'

export const middleware = (middleware) => {
  return (target, key, descriptor) => {
    const mapKey = getMapKey(target, key, descriptor)
    routerMap
      .get(mapKey)
      .actions
      .unshift(middleware)
  }
}
