/**
 *  Index.js
 *  Create By rehellinen
 *  Create On 2019/3/19 22:00
 */
import { isProduction, rRoot } from '../utils/utils'

export class Config {
  // 配置
  config = {}

  /**
   * 读取配置文件
   * @param dir 相对路径，相对于process.cwd()
   * @private
   */
  load (dir = 'config') {
    const baseConf = require(rRoot(`${dir}/base.conf`))['default']
    const devConf = require(rRoot(`${dir}/dev.conf`))['default']
    const prodConf = require(rRoot(`${dir}/prod.conf`))['default']
    this.config = {
      ...baseConf,
      ...(isProduction ? prodConf : devConf)
    }
  }

  // 获取配置
  get (prefix = '') {
    let res = this.config
    prefix.split('.').forEach(item => {
      if (!item) {
        return
      }
      res = res[item.toUpperCase()]
    })
    return res
  }
}

export const config = new Config()
