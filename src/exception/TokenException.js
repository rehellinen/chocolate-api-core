import { Exception } from './Exception'

class ExpiredToken extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 401,
      status: 30001,
      message: 'Token已过期'
    })
  }
}

class InvalidToken extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 401,
      status: 30002,
      message: '无效Token'
    })
  }
}

export { ExpiredToken, InvalidToken }
