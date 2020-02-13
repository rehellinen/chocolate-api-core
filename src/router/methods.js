import { config } from '../class'
import { warn, firstUpperCase, isPlainObject, rRoot } from '../utils'
import { normalizePath, routerMap } from './utils'

const baseMethod = (url, exp, method) => {
  // 支持传入对象
  if (isPlainObject(url)) {
    const res = []
    Object.keys(url).forEach(key => {
      res.push(baseMethod(key, url[key], method))
    })
    return res
  }

  const pathArr = exp.split('.')
  const actionName = pathArr.pop()
  const fileName = firstUpperCase(pathArr.pop())
  const ctorPath = rRoot(config.get('dir.module').app, 'controller', pathArr.join('/'), fileName)
  const Ctor = require(ctorPath).default

  if (!Ctor.prototype[actionName]) {
    warn(`${fileName}.js中的${actionName}方法不存在`)
    return
  }

  const key = fileName + '.' + actionName
  let routerConf = routerMap.get(key)
  if (!routerConf) {
    routerConf = {}
    routerMap.set(key, routerConf)
  }

  const action = async (ctx, next) => {
    const instance = new Ctor()
    instance.setConfig(ctx, next)
    await instance[actionName]()
    await next()
  }

  const extraConf = {
    method,
    url: normalizePath(url)
  }
  routerConf.action
    ? routerConf.action.unshift(action)
    : routerConf.action = [action]
  Object.assign(routerConf, extraConf)
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
