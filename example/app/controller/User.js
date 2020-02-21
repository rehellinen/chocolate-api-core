const {
  Controller,
  UserModel,
  NoAuthority,
  getTokens, verifyPwd,
  login, admin, refresh, validate
} = require('libs')

class User extends Controller {
  @validate('user.login')
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

  @refresh()
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

  // @admin()
  async getAll () {
    const users = await UserModel.getAllUsers()
    this.json({
      message: '获取所有用户信息成功',
      data: users
    })
  }

  @admin()
  @validate('user.create')
  async create () {
    await new UserModel().createUser(this.ctx.checkedParams)
    this.json({ message: '添加用户成功' })
  }

  @admin()
  @validate('user.update')
  async update () {
    await new UserModel().updateUser(this.ctx.checkedParams)
    this.json({ message: '更新信息成功' })
  }

  @admin()
  async delete () {
  }

  @admin()
  @validate('user.password')
  async password () {
    await new UserModel().updatePassword(this.ctx.checkedParams)
    this.json({ message: '更新用户密码成功' })
  }

  // 以下是用户操作的api
  @login()
  async userGet () {
    this.json({
      message: '获取信息成功',
      data: this.ctx.user
    })
  }

  @login()
  @validate('user.userPassword')
  async userPassword () {
    this.ctx.checkedParams.id = this.ctx.user.id
    await new UserModel().updatePassword(this.ctx.checkedParams)
    this.json({ message: '更改密码成功' })
  }

  @login()
  @validate('user.userUpdate')
  async userUpdate () {
    this.ctx.checkedParams.id = this.ctx.user.id
    await new UserModel().updateUser(this.ctx.checkedParams)
    this.json({ message: '更新信息成功' })
  }

  @login()
  @validate('user.avatar')
  async avatar () {
    this.ctx.checkedParams.id = this.ctx.user.id
    await new UserModel().updateUser(this.ctx.checkedParams)
    this.json({ message: '更新头像成功' })
  }
}

export default User
