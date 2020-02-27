import { getConfig } from '../class'
import { warn, firstUpperCase, isPlainObject, rRoot } from '../utils'
import { normalizePath, orderedRouterMap, routerMap } from './utils'

const baseMethod = (url, exp, method) => {
  // 支持传入对象
  if (isPlainObject(url)) {
    const res = []
    for (const [key, val] of Object.entries(url)) {
      res.push(baseMethod(key, val, method))
    }
    return res
  }

  const pathArr = exp.split('.')
  const actionName = pathArr.pop()
  const fileName = firstUpperCase(pathArr.pop())
  const ctorPath = rRoot(getConfig('dir.module').app, 'controller', pathArr.join('/'), fileName)
  const Ctor = require(ctorPath)[fileName]

  if (!Ctor.prototype[actionName]) {
    warn(`${fileName}.js中的${actionName}方法不存在`)
    return
  }

  const key = fileName + '.' + actionName
  let routerConf = routerMap.get(key)
  if (!routerConf) {
    routerConf = {}
  }

  const action = async (ctx, next) => {
    const instance = new Ctor()
    instance.setConfig(ctx, next)
    await instance[actionName]()
    await next()
  }

  routerConf.method = method
  routerConf.url = normalizePath(url)
  routerConf.action
    ? routerConf.action.push(action)
    : routerConf.action = [action]

  orderedRouterMap.set(key, routerConf)
  return key
}

export const get = (url, exp) => baseMethod(url, exp, 'get')

export const post = (url, exp) => baseMethod(url, exp, 'post')

export const put = (url, exp) => baseMethod(url, exp, 'put')

export const del = (url, exp) => baseMethod(url, exp, 'del')

export const patch = (url, exp) => baseMethod(url, exp, 'patch')

export const head = (url, exp) => baseMethod(url, exp, 'head')

export const all = (url, exp) => baseMethod(url, exp, 'get')

// TODO: options / redirect / head / patch
export const options = (url, exp) => baseMethod(url, exp, 'options')

export const redirect = (url, exp) => baseMethod(url, exp, 'get')
