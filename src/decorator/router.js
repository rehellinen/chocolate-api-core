/**
 *  router.js
 *  Create By rehellinen
 *  Create On 2018/10/25 23:19
 */
import { firstUpperCase, isClass, rRoot } from '../utils'
import { FilesNotFound } from '../exception'
import { config } from '../class'

// 记录路由信息
export const routerMap = new Map()

export const prefix = (path = '') => {
  return (target) => {
    target.prototype.prefix = normalizePath(path)
  }
}

// 获取独一无二的key
export const getMapKey = (target, key, descriptor) => {
  return target.constructor.name +
    key +
    descriptor.initializer && descriptor.initializer.call(this)
}

export const get = (path) => baseMethod({ method: 'get', path })

export const post = (path) => baseMethod({ method: 'post', path })

export const put = (path) => baseMethod({ method: 'put', path })

export const del = (path) => baseMethod({ method: 'del', path })

export const all = (path) => baseMethod({ method: 'all', path })

// 处理路径（只能以'/'开头，而不能以'/'结尾）
const normalizePath = (path = '') => {
  path = path.startsWith('/') ? path : `/${path}`
  path = path.endsWith('/') ? path.substr(0, path.length - 1) : path
  return path
}

const baseMethod = ({ path = '', method }) => {
  return (target, key, descriptor) => {
    const routerStr = descriptor.initializer && descriptor.initializer.call(this)
    const actions = getController(routerStr)
    routerMap.set(getMapKey(target, key, descriptor), {
      method,
      target,
      actions,
      path: normalizePath(path)
    })
  }
}

// 获取控制器
const getController = (str = '') => {
  const [controller, action] = str.split('.')
  const name = firstUpperCase(controller)
  const path = rRoot(config.get('dir.controller'), `${name}.js`)
  let file
  try {
    file = require(path)
  } catch (e) {
    throw new FilesNotFound({
      message: `[Controller] 找不到文件 Path:${path}`
    })
  }
  const Controller = file[name]
  if (!isClass(Controller)) {
    throw new FilesNotFound({
      message: `[Controller] '${name}'不是一个类 Path:${path}`
    })
  }
  const instance = new Controller()
  if (!instance[action]) {
    throw new FilesNotFound({
      message: `[Controller] '${name}'没有'${action}'方法 Path:${path}`
    })
  }
  return [
    async (ctx, next) => {
      const instance = new Controller()
      instance.setConfig(ctx, next)
      await instance[action]()
      await next()
    }
  ]
}
