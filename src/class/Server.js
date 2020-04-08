/**
 *  Server.js
 *  Create By rehellinen
 *  Create On 2019/3/19 22:39
 */
import Koa from 'koa'
import chalk from 'chalk'
import portfinder from 'portfinder'
import { rCore, rRoot, warn } from '../utils'
import { Controller } from './Controller'
import { getConfig } from './Config'
import { Exception } from '../exception'
import { initUserModel, initRoleModel, initAuthModel, initArticleModel, initRelation } from '../model'

export class Server {
  // Koa2实例
  app = new Koa()

  // 中间件配置
  middlewares = ['exception', 'response', 'router', 'staticServer']

  // 监听IP
  host = process.env.HOST || getConfig('host') || '127.0.0.1'

  // 监听端口
  port = process.env.PORT || getConfig('port') || 3000

  constructor () {
    if (getConfig('cors.open')) {
      this.middlewares.splice(1, 0, 'cors')
    }
  }

  async start () {
    try {
      // 添加中间件，先添加框架的中间件，再添加用户自定义的
      this.useMiddlewares(rCore('middleware'), this.middlewares)
      this.useMiddlewares(rRoot(getConfig('DIR.MIDDLEWARE')), getConfig('MIDDLEWARE'))
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
    const { sequelize } = require('../db')
    initRoleModel(sequelize)
    initUserModel(sequelize)
    initAuthModel(sequelize)
    initArticleModel(sequelize)
    initRelation(sequelize)
  }

  async checkPort () {
    portfinder.basePort = 3000
    const newPort = await portfinder.getPortPromise()
    if (newPort !== this.port) {
      warn(`[System] port ${this.port} is occupied and opened a new port: ${newPort}`)
      this.port = newPort
    }
  }

  useMiddlewares (path, names = []) {
    for (const name of names) {
      const middleware = require(`${path}/${name}.js`)[name]
      middleware(this.app)
    }
  }

  static processError (e) {
    if (e instanceof Exception) {
      // console.log(e)
      console.log(chalk.red(`Error: ${e.message}`))
    } else {
      console.log(e)
      // console.log(chalk.red(`Error: ${e.message}`))
    }
  }
}
