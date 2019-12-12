import { Token } from '../class'
import { TokenType } from './enum'
import {InvalidToken, NoAuthority, NotFound} from '../exception'
import {UserModel} from "../model/UserModel"

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

export const parseHeader = async (ctx, type = TokenType.ACCESS) => {
  if (!ctx.header || !ctx.header.authorization) {
    throw new NoAuthority({ message: '没有携带令牌' })
  }
  const res = ctx.header.authorization.split(' ')
  const [prefix, token] = res
  if (res.length !== 2 || prefix.toLowerCase() !== 'bearer') {
    throw new NoAuthority()
  }

  const payload = verifyToken(token)
  if (payload.type !== type) {
    throw new NoAuthority({ message: '令牌类型错误' })
  }
  const user = await new UserModel().getOneById({ id: payload.id })
  if (!user) {
    throw new NotFound({ message: '用户不存在' })
  }
  ctx.userInfo = user
}
