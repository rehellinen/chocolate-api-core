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
   * @param payload 其他需要保存在JWT的数据
   * @returns {*}
   */
  getAccessToken (id, payload = {}) {
    const totalPayload = {
      ...payload,
      id,
      type: TokenType.ACCESS
    }
    return jwt.sign(totalPayload, this.secret, {
      expiresIn: this.accessExpire
    })
  }

  /**
   * 生成refresh_token
   * @param id 用户ID
   * @param payload 其他需要保存在JWT的数据
   * @returns {*}
   */
  getRefreshToken (id, payload = {}) {
    const totalPayload = {
      ...payload,
      id,
      type: TokenType.REFRESH
    }
    return jwt.sign(totalPayload, this.secret, {
      expiresIn: this.refreshExpire
    })
  }

  /**
   * 验证令牌是否合法
   * @param token 令牌
   */
  verify (token) {
    let decoded
    try {
      decoded = jwt.verify(token, this.secret)
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredToken()
      } else {
        throw new InvalidToken()
      }
    }
    return decoded
  }
}

/**
 * 获取access_token
 * @param id 用户的id
 * @param payload 其他需要保存在JWT的数据
 */
export const getAccessToken = (id, payload) => Token.getInstance().getAccessToken(id, payload)

/**
 * 获取refresh_token
 * @param id 用户的id
 * @param payload 其他需要保存在JWT的数据
 */
export const getRefreshToken = (id, payload) => Token.getInstance().getRefreshToken(id, payload)

/**
 * 获取access_token和refresh_token
 * @param id 用户的id
 * @param payload 其他需要保存在JWT的数据
 */
export const getTokens = (id, payload) => {
  const accessToken = Token.getInstance().getAccessToken(id, payload)
  const refreshToken = Token.getInstance().getRefreshToken(id, payload)
  return [accessToken, refreshToken]
}

/**
 * 校验Token是否过期
 * @param token refresh_token或access_token
 */
export const verifyToken = (token) => Token.getInstance().verify(token)

/**
 * 校验Token是否过期
 * @param token access_token
 */
export const verifyAccessToken = (token) => {
  const decoded = Token.getInstance().verify(token)
  if (decoded.type !== TokenType.ACCESS) {
    throw new InvalidToken({ message: '令牌类型错误' })
  }
}

/**
 * 校验Token是否过期
 * @param token refresh_token
 */
export const verifyRefreshToken = (token) => {
  const decoded = Token.getInstance().verify(token)
  if (decoded.type !== TokenType.REFRESH) {
    throw new InvalidToken({ message: '令牌类型错误' })
  }
}
