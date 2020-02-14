/**
 * key为`${fileName}.${actionName}`
 * value为一个对象，包含method、url、action属性
 */
export const routerMap = new Map()

/**
 * 安装路由的编写顺序进行排序
 */
export const orderedRouterMap = new Map()

// 保证url以'/'开头，并且不以'/'结尾
export const normalizePath = (path = '') => {
  path = path.startsWith('/') ? path : `/${path}`
  path = path.endsWith('/') ? path.substr(0, path.length - 1) : path
  return path
}
