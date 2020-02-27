// 启动服务器
require('@babel/register')
const { resolve } = require('path')
const moduleAlias = require('module-alias')

// 配置文件夹别名
moduleAlias.addAliases({
  libs: resolve(__dirname, '../src')
})

// 加载配置文件
const { Server, loadConfig } = require('libs')
loadConfig('example/config')

new Server().start()
