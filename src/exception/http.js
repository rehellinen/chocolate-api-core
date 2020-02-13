import { Exception } from './Exception'

class MethodNotAllowed extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 405,
      status: 10002,
      message: '请求的HTTP方法不正确'
    })
  }
}

class UrlNotFound extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 404,
      status: 10001,
      message: 'URL未定义'
    })
  }
}

export { MethodNotAllowed, UrlNotFound }
