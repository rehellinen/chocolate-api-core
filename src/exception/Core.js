import { Exception } from './Exception'

class ParamsException extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 400,
      status: 20000,
      message: '参数错误'
    })
  }
}

class NotFound extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 404,
      status: 10001,
      message: '资源不存在'
    })
  }
}

export { ParamsException, NotFound }