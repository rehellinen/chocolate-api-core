import { Exception } from './Exception'

class ExpiredToken extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 401,
      status: 20100,
      message: 'Token已过期'
    })
  }
}

class InvalidToken extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 401,
      status: 20200,
      message: '令牌类型错误'
    })
  }
}

class NoAuthority extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 401,
      status: 20300,
      message: '认证失败'
    })
  }
}

class InsufficientAuthority extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 403,
      status: 20400,
      message: '权限不足'
    })
  }
}

export { ExpiredToken, InvalidToken, NoAuthority, InsufficientAuthority }
