/**
 * key为`${fileName}.${actionName}`
 * value为一个对象，包含method、url、action属性
 */
export const routerMap = new Map()

// 保证url以'/'开头，并且不以'/'结尾
export const normalizePath = (path = '') => {
  path = path.startsWith('/') ? path : `/${path}`
  path = path.endsWith('/') ? path.substr(0, path.length - 1) : path
  return path
}
