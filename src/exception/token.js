import { Exception } from './Exception'

class ExpiredToken extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 401,
      status: 20101,
      message: 'Token已过期'
    })
  }
}

class InvalidToken extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 401,
      status: 20102,
      message: '令牌类型错误'
    })
  }
}

class NoAuthority extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 401,
      status: 20103,
      message: '认证失败'
    })
  }
}

export { ExpiredToken, InvalidToken, NoAuthority }
