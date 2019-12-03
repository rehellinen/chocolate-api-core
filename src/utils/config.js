/**
 *  Index.js
 *  Create By rehellinen
 *  Create On 2019/3/19 22:00
 */
import { isProduction, rRoot } from './utils'

const baseConf = require(rRoot('config/base.conf'))['default']
const devConf = require(rRoot('config/dev.conf'))['default']
const prodConf = require(rRoot('config/prod.conf'))['default']

const config = {
  ...baseConf,
  ...(isProduction ? prodConf : devConf)
}

export const coreConfig = {
  DIR: {
    MIDDLEWARE: 'middleware'
  }
}

export const getConfig = (prefix = '') => {
  let res = config
  prefix.split('.').forEach(item => {
    if (!item) {
      return
    }
    res = res[item.toUpperCase()]
  })
  return res
}
