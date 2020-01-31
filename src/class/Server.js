/**
 *  Server.js
 *  Create By rehellinen
 *  Create On 2019/3/19 22:39
 */
import Koa from 'koa'
import R from 'ramda'
import chalk from 'chalk'
import portfinder from 'portfinder'
import { rCore, rRoot, warn, error } from '../utils'
import { Controller } from './Controller'
import { Model } from './Model'
import { FilesNotFound } from '../exception'
import { config } from './Config'

export class Server {
  // Koa2实例
  app = new Koa()

  // 中间件配置
  middlewares = ['exception', 'response', 'router']

  // 监听IP
  host = process.env.HOST || config.get('host') || '127.0.0.1'

  // 监听端口
  port = process.env.PORT || config.get('port') || 3000

  constructor () {
    if (config.get('cors.open')) {
      this.middlewares.splice(1, 0, 'cors')
    }
  }

  async start () {
    try {
      // 添加中间件，先添加框架的中间件，再添加用户自定义的
      this.useMiddlewares(
        rCore('middleware')
      )(this.middlewares)
      this.useMiddlewares(
        rRoot(config.get('DIR.MIDDLEWARE'))
      )(config.get('MIDDLEWARE') || [])
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
    Controller.prototype.config = config.get()
    // 初始化Model
    Model.prototype.config = config.get()
    Model.prototype.modelConfig = config.get('model')
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
      item => `${path}/${item}`,
      require,
      R.map(item => item(this.app))
    ))
  }

  static processError (e) {
    if (e instanceof FilesNotFound) {
      error(e.message)
    } else {
      console.log(e)
    }
  }
}
