import { config } from '../class'
import { firstUpperCase, rRoot } from '../utils'

export const routerMap = new Map()

const baseMethod = (url, exp, method) => {
  const pathArr = exp.split('.')
  const action = pathArr.pop()
  const fileName = firstUpperCase(pathArr.pop())
  const ctorPath = rRoot(config.get('dir.module').app, 'controller', pathArr.join('/'), fileName)
  const Ctor = require(ctorPath).default

  let ctorConf = routerMap.get(Ctor)
  if (!ctorConf) {
    const conf = ctorConf = {
      [action]: {}
    }
    routerMap.set(Ctor, conf)
  }

  const extraConf = {
    method,
    url: normalizePath(url),
    action: async (ctx, next) => {
      const instance = new Ctor()
      instance.setConfig(ctx, next)
      await instance[action]()
      await next()
    }
  }
  const routerConf = ctorConf[action]
  routerConf
    ? Object.assign(routerConf, extraConf)
    : ctorConf[action] = extraConf
}

export const get = (url, exp) => {
  baseMethod(url, exp, 'get')
}

export const post = (url, exp) => {
  baseMethod(url, exp, 'post')
}

export const put = (url, exp) => {
  baseMethod(url, exp, 'put')
}

export const del = (url, exp) => {
  baseMethod(url, exp, 'del')
}

export const patch = (url, exp) => {
  baseMethod(url, exp, 'patch')
}

export const head = (url, exp) => {
  baseMethod(url, exp, 'head')
}

export const all = (url, exp) => {
  baseMethod(url, exp, 'get')
}

// TODO: options / redirect
export const options = (url, exp) => {
  baseMethod(url, exp, 'options')
}

export const redirect = (url, exp) => {
  baseMethod(url, exp, 'get')
}

function normalizePath (path = '') {
  path = path.startsWith('/') ? path : `/${path}`
  path = path.endsWith('/') ? path.substr(0, path.length - 1) : path
  return path
}
