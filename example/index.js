// 启动服务器
require('@babel/register')
const { Server, config } = require('../src')

config.loadConfig('example/config')

new Server().start()
