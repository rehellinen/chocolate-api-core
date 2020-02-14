export default {
  env: 'prod',
  // 资源文件的url前缀
  URL_PREFIX: 'http:127.0.0.1:3000/',
  // 生产环境数据库配置
  DATABASE: {
    host: '127.0.0.1', // 主机
    port: 3306, // 端口号
    user: 'root', // 登录账户
    password: '123456', // 密码
    database: '', // 数据库名称
    charset: 'utf8' // 字符集
  }
}
