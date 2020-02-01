import { Token } from '../class'
import { TokenType } from './enum'
import { InvalidToken } from '../exception'

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
 * 校验Token是否过期
 * @param token refresh_token或access_token
 */
export const verifyToken = (token) => Token.getInstance().verify(token)

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

export const verifyAccessToken = (token) => {
  const decoded = Token.getInstance().verify(token)
  if (decoded.type !== TokenType.ACCESS) {
    throw new InvalidToken({ message: '令牌类型错误' })
  }
}

export const verifyRefreshToken = (token) => {
  const decoded = Token.getInstance().verify(token)
  if (decoded.type !== TokenType.REFRESH) {
    throw new InvalidToken({ message: '令牌类型错误' })
  }
}
