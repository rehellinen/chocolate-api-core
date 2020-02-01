const {
  Controller,
  UserModel,
  NoAuthority,
  getTokens, verifyPwd,
  NotFound
} = require('libs')

export class User extends Controller {
  async login () {
    const params = this.ctx.checkedParams
    const user = await new UserModel().getUserByAccount(params.account)
    if (verifyPwd(params.password, user.password)) {
      const [accessToken, refreshToken] = getTokens(user.id)
      this.json({
        message: '获取Token成功',
        data: {
          accessToken,
          refreshToken
        }
      })
    } else {
      throw new NoAuthority({ message: '密码错误' })
    }
  }

  async refresh () {
    const user = this.ctx.user
    const [accessToken, refreshToken] = getTokens(user.id)
    this.json({
      message: '刷新Token成功',
      data: {
        accessToken,
        refreshToken
      }
    })
  }

  async get () {
    const users = await new UserModel().getOneUser(this.ctx.checkedParams.id)
    this.json({
      message: '获取用户信息成功',
      data: users
    })
  }

  async getAll () {
    const users = await new UserModel().getAllUsers()
    this.json({
      message: '获取所有用户信息成功',
      data: users
    })
  }

  async create () {
    await new UserModel().createUser(this.ctx.checkedParams)
    this.json({ message: '添加用户成功' })
  }

  // TODO: 软删除
  delete () {
  }

  async update () {
    await new UserModel().updateUser(this.ctx.user, this.ctx.checkedParams)
    this.json({ message: '更新信息成功' })
  }

  async adminUpdate () {
    await new UserModel().updateUserAdmin(this.ctx.checkedParams)
    this.json({ message: '更改信息成功' })
  }

  async avatar () {
    const params = this.ctx.checkedParams
    await new UserModel().updateById(params.id, {
      avatar: params.avatar
    })
    this.json({ message: '更新头像成功' })
  }

  async password () {
    await new UserModel().updatePassword(this.ctx.user, this.ctx.checkedParams)
    this.json({ message: '更新密码成功' })
  }

  async adminPassword () {
    await new UserModel().updatePasswordAdmin(this.ctx.checkedParams)
    this.json({ message: '更新密码成功' })
  }
}
