import { isProduction, rRoot } from '../utils/utils'

class Config {
  // 配置
  config = {}

  /**
   * 读取配置文件
   * @param dir 相对路径，相对于process.cwd()
   */
  load (dir = 'config') {
    const baseConf = require(rRoot(`${dir}/base.conf`)).config
    const devConf = require(rRoot(`${dir}/dev.conf`)).config
    const prodConf = require(rRoot(`${dir}/prod.conf`)).config
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
// 全局唯一配置对象
const config = new Config()

export const loadConfig = config.load.bind(config)
export const getConfig = config.get.bind(config)
