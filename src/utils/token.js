import { Token } from '../class'
import { TokenType } from './enum'
import { InvalidToken } from '../exception'

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
 * 获取access_token
 * @param id 用户的id
 * @param payload 其他需要保存在JWT的数据
 */
export const getAccessToken = (id, payload) => {
  return Token.getInstance().getAccessToken(id, payload)
}

/**
 * 获取refresh_token
 * @param id 用户的id
 * @param payload 其他需要保存在JWT的数据
 */
export const getRefreshToken = (id, payload) => {
  return Token.getInstance().getRefreshToken(id, payload)
}

export const verifyToken = (token) => {
  return Token.getInstance().verify()
}

export const verifyAccessToken = (token) => {
  const decoded = Token.getInstance().verify()
  if (decoded.type !== TokenType.ACCESS) {
    throw new InvalidToken({ message: '令牌类型错误' })
  }
}

export const verifyRefreshToken = (token) => {
  const decoded = Token.getInstance().verify()
  if (decoded.type !== TokenType.REFRESH) {
    throw new InvalidToken({ message: '令牌类型错误' })
  }
}
