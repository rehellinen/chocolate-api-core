// 框架核心功能配置
export default {
  PORT: 3000,
  HOST: '127.0.0.1',
  DEBUG: true,
  MIDDLEWARE: [],
  // 配置文件存放的路径
  DIR: {
    MODULE: {
      app: 'example/app'
    },
    EXCEPTION: 'example/common/exception',
    MIDDLEWARE: 'example/common/middleware',
    VALIDATE: 'example/common/validate'
  },
  CORS: {
    OPEN: true,
    METHODS: ['GET', 'POST', 'DELETE', 'PUT'],
    ORIGIN: '*', // Access-Control-Allow-Origin
    MAX_AGE: 5, // Access-Control-Max-Age
    CREDENTIALS: true, // Access-Control-Allow-Credentials
    // Access-Control-Expose-Headers
    EXPOSE_HEADERS: ['WWW-Authenticate', 'Server-Authorization'],
    // Access-Control-Allow-Methods
    ALLOW_HEADERS: ['Content-Type', 'Authorization', 'Accept', 'token', 'Content-Length', 'X-Requested-With']
  },
  UPLOAD: {
    UPLOAD_DIR: 'upload', // 上传文件的根目录，upload表示/upload/
    UPLOAD_NAME: 'file' // 表单中表示上传文件的key
  },
  TOKEN: {
    SECRET: 'github.com/rehellinen', // 生成token的前缀
    ACCESS_EXPIRES_IN: 7200, // access_token过期时间（单位为s）
    REFRESH_EXPIRES_IN: 3600 * 24 * 30 // refresh_token过期时间
  },
  MODEL: {
    CONVERT_FIELDS: true, // 是否自动转换驼峰命名法 / 下划线命名法
    GET_SIZE: 15, // 通过getAll方法获取数据的数据数量
    PAGE_SIZE: 15 // 分页大小
  }
}
