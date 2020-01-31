const { Controller, UserModel, verify, NoAuthority, getTokens } = require('libs')

export class User extends Controller {
  login () {
    const params = this.ctx.checkedParams
    const user = UserModel.getUserByAccount(params.account)
    if (verify(params.password, user.password)) {
      const [accessToken, refreshToken] = getTokens(user.id)
      this.json({
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

  }

  getAll () {

  }

  add () {
    const params = this.ctx.checkedParams
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
