import { NoAuthority, NotFound } from '../exception'
import { middleware } from './decorator'
import { AdminType, TokenType, UserStatus, verifyToken } from '../utils'
import { AuthModel, UserModel } from '../model'

const isUserEnable = status => {
  if (status !== UserStatus.ENABLE) {
    throw new NoAuthority({ message: '账户状态异常' })
  }
  return true
}

const isAdmin = status => {
  if (status !== AdminType.IS) {
    throw new NoAuthority({ message: '该用户不是超级管理员' })
  }
  return true
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

// 只能为有效的refresh_token
export const refresh = () => {
  return middleware(async (ctx, next) => {
    await parseHeader(ctx, TokenType.REFRESH)
    isUserEnable(ctx.user.status)
    await next()
  })
}

// 判断用户是否登录
export const login = () => {
  return middleware(async (ctx, next) => {
    await parseHeader(ctx)
    isUserEnable(ctx.user.status)
    await next()
  })
}

// 管理员才能访问
export const admin = () => {
  return middleware(async (ctx, next) => {
    await parseHeader(ctx)
    isAdmin(ctx.user.status)
    await next()
  })
}

// 需要特定权限
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
