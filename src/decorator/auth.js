import { NoAuthority, NotFound } from '../exception'
import { middleware } from './decorator'
import { TokenType, UserStatus, verifyToken } from '../utils'
import { AuthModel, UserModel } from '../model'

const isUserEnable = status => {
  if (status !== UserStatus.ENABLE) {
    throw new NoAuthority({ message: '账户状态异常' })
  }
  return true
}

const isAdmin = status => {
  if (status !== UserStatus.ADMIN) {
    throw new NoAuthority({ message: '该用户不是超级管理员' })
  }
  return true
}

// 只能为有效的access_token
export const access = () => {
  return middleware(async (ctx, next) => {
    await parseHeader(ctx)
    isUserEnable(ctx.user.status)
    await next()
  })
}

// 只能为有效的refresh_token
export const refresh = () => {
  return middleware(async (ctx, next) => {
    await parseHeader(ctx, TokenType.REFRESH)
    isUserEnable(ctx.user.status)
    await next()
  })
}

// 管理员才能访问
export const admin = () => {
  return middleware(async (ctx, next) => {
    await parseHeader(ctx, TokenType.REFRESH)
    isAdmin(ctx.user.status)
    await next()
  })
}

export const auth = (auth) => {
  return middleware(async (ctx, next) => {
    await parseHeader(ctx)
    if (isAdmin(ctx.user.status)) {
      await next()
    } else {
      isUserEnable(ctx.user.status)
      const groupId = ctx.user.groupId
      if (!groupId) {
        throw new NoAuthority({
          message: '该用户不属于任何权限组'
        })
      }

      const res = new AuthModel().getOne({
        condition: {
          groupId,
          auth
        }
      })
      if (!res) {
        throw new NoAuthority({
          message: '权限不足'
        })
      }
      await next()
    }
  })
}

// 判断用户是否登录并且操作属于自己的数据
export const login = (field = 'id') => {
  return middleware(async (ctx, next) => {
    await parseHeader(ctx)
    isUserEnable(ctx.user.status)
    if (ctx.checkedParams[field] !== ctx.user.id) {
      throw new NoAuthority({
        message: '权限不足'
      })
    }
    await next()
  })
}

const parseHeader = async (ctx, type = TokenType.ACCESS) => {
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
  ctx.user = user
}
