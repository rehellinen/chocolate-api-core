const {
  Controller,
  UserModel,
  NoAuthority,
  getTokens, verifyPwd, generatePwd
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

  refresh () {
    const [accessToken, refreshToken] = getTokens(user.id)
    this.json({
      message: '刷新Token成功',
      data: {
        accessToken,
        refreshToken
      }
    })
  }

  getAll () {

  }

  async add () {
    const params = this.ctx.checkedParams
    params.password = generatePwd(params.password)
    await new UserModel().saveUser(params)
    this.json({ message: '添加用户成功' })
  }

  delete () {

  }

  edit () {

  }

  avatar () {

  }

  password () {

  }

  adminPassword () {

  }

  adminEdit () {

  }
}
