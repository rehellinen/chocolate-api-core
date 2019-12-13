import { NoAuthority, NotFound } from '../exception'
import { middleware } from './decorator'
import { TokenType, UserStatus, verifyToken } from '../utils'
import { UserModel } from '../model'

const isUserDisable = status => {
  if (status !== UserStatus.ENABLE) {
    throw new NoAuthority({ message: '账户状态异常' })
  }
}

const isAdmin = status => {
  if (status !== UserStatus.ADMIN) {
    throw new NoAuthority({ message: '该用户不是超级管理员' })
  }
}

// 登录后才能访问
export const login = () => {
  return middleware(async (ctx, next) => {
    await parseHeader(ctx)
    isUserDisable(ctx.userInfo.status)
    await next()
  })
}

// 只能为有效的refresh_token
export const refresh = () => {
  return middleware(async (ctx, next) => {
    await parseHeader(ctx, TokenType.REFRESH)
    isUserDisable(ctx.userInfo.status)
    await next()
  })
}

// 管理员才能访问
export const admin = () => {
  return middleware(async (ctx, next) => {
    await parseHeader(ctx, TokenType.REFRESH)
    isAdmin(ctx.userInfo.status)
    await next()
  })
}

export const auth = (auth) => {
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
