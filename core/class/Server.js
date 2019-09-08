/**
 *  Server.js
 *  Create By rehellinen
 *  Create On 2019/3/19 22:39
 */
import Koa from 'koa'
import R from 'ramda'
import chalk from 'chalk'
import portfinder from 'portfinder'
import { r, getConfig, warn, coreConfig, error } from '../utils'
import { Controller } from './Controller'
import { Model } from './Model'
import { LibsNotFound } from '../exception'

const config = getConfig()

export class Server {
  // Koa2实例
  app = new Koa()

  // 中间件配置
  middlewares = ['exception', 'response', 'router']

  // 监听IP
  host = process.env.HOST || config.HOST || '127.0.0.1'

  // 监听端口
  port = process.env.PORT || config.PORT || 3000

  constructor () {
    if (config.CORS.OPEN) {
      this.middlewares.splice(1, 0, 'cors')
    }
  }

  async start () {
    try {
      // 添加中间件，先添加框架的中间件，再添加用户自定义的
      this.useMiddlewares(coreConfig.DIR.MIDDLEWARE)(this.middlewares)
      this.useMiddlewares(config.DIR.MIDDLEWARE)(config.MIDDLEWARE || [])
      // 初始化框架类库
      this.initLibs()
      // 判断端口号是否占用
      await this.checkPort()
      // 启动服务器
      this.app.listen(this.port, this.host)
      console.log(chalk.blue(`Welcome to use rehellinen-api ^ ^`))
      console.log(chalk.blue(`Server listens on ${this.host}:${this.port}`))
    } catch (e) {
      Server.processError(e)
    }
  }

  initLibs () {
    // 初始化Controller
    Controller.prototype.app = this.app
    Controller.prototype.config = getConfig()
    // 初始化Model
    Model.prototype.config = getConfig()
  }

  async checkPort () {
    portfinder.basePort = 3000
    const newPort = await portfinder.getPortPromise()
    if (newPort !== this.port) {
      warn(`[System] port ${this.port} is occupied and opened a new port: ${newPort}`)
      this.port = newPort
    }
  }

  useMiddlewares (path) {
    return R.map(R.pipe(
      item => `${r(path)}/${item}`,
      require,
      R.map(item => item(this.app))
    ))
  }

  static processError (e) {
    if (e instanceof LibsNotFound) {
      error(e.message)
    } else {
      console.log(e)
    }
  }
}
