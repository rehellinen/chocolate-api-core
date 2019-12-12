/**
 *  Token.js
 *  Create By rehellinen
 *  Create On 2018/9/28 20:37
 */
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { ExpiredToken, InvalidToken } from '../exception'
import { config } from './Config'
import { TokenType } from '../utils'

export class Token {
  // 用于加密的秘钥
  secret

  // access_token过期时间
  accessExpire

  // refresh_token过期时间
  refreshExpire

  // 单例模式
  static getInstance () {
    if (!this.instance) {
      this.instance = new Token()
    }
    return this.instance
  }

  /**
   * constructor
   * @param secret 生成Token的密匙
   * @param accessExpire access_token过期时间
   * @param refreshExpire refresh_token过期时间
   */
  constructor ({ secret, accessExpire, refreshExpire } = {}) {
    this.secret = secret || config.get('token.secret')
    this.accessExpire = accessExpire || config.get('token.access_expires_in')
    this.refreshExpire = refreshExpire || config.get('token.refresh_expires_in')
  }

  /**
   * 生成access_token
   * @param id 用户ID
   * @returns {*}
   */
  getAccessToken (id) {
    const payload = {
      id,
      type: TokenType.ACCESS
    }
    return jwt.sign(payload, this.secret, {
      expiresIn: this.accessExpire
    })
  }

  /**
   * 生成refresh_token
   * @param id 用户ID
   * @returns {*}
   */
  getRefreshToken (id) {
    const payload = {
      id,
      type: TokenType.REFRESH
    }
    return jwt.sign(payload, this.secret, {
      expiresIn: this.refreshExpire
    })
  }

  /**
   * 验证令牌是否合法
   * @param token 令牌
   */
  verify (token) {
    let decode
    try {
      decode = jwt.verify(token, this.secret)
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredToken()
      } else {
        throw new InvalidToken()
      }
    }
    return decode
  }
}
