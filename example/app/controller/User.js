const {
  Controller,
  UserModel,
  getAccessToken,
  login, admin, refresh, validate
} = require('libs')

export class User extends Controller {
  @validate('user.login')
  async login () {
    const params = this.ctx.checkedParams
    const [accessToken, refreshToken] = await UserModel.login(params)
    this.json({
      message: '获取Token成功',
      data: {
        accessToken,
        refreshToken
      }
    })
  }

  @refresh()
  async refresh () {
    const user = this.ctx.user
    const accessToken = getAccessToken(user.id)
    this.json({
      message: '刷新Token成功',
      data: { accessToken }
    })
  }

  @admin()
  @validate('base.page')
  async getAll () {
    const { page, pageSize } = this.ctx.checkedParams
    const users = await UserModel.getAllUsers(page, pageSize)
    this.json({
      message: '获取所有用户信息成功',
      data: users
    })
  }

  @admin()
  @validate('base.id')
  async getOne () {
    const user = await UserModel.getUserById(this.ctx.checkedParams.id)
    this.json({
      message: '获取用户信息成功',
      data: user
    })
  }

  @admin()
  @validate('user.create')
  async create () {
    await UserModel.createUser(this.ctx.checkedParams)
    this.json({ message: '添加用户成功' })
  }

  @admin()
  @validate('user.update')
  async update () {
    await UserModel.updateUser(this.ctx.checkedParams)
    this.json({ message: '更新信息成功' })
  }

  @admin()
  @validate('base.id')
  async delete () {
    await UserModel.deleteUser(this.ctx.checkedParams.id)
    this.json({ message: '删除用户成功' })
  }

  @admin()
  @validate('user.password')
  async password () {
    await UserModel.updateUser(this.ctx.checkedParams)
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
    await UserModel.UserUpdatePwd(this.ctx.checkedParams, this.ctx.user)
    this.json({ message: '更改密码成功' })
  }

  @login()
  @validate('user.userUpdate')
  async userUpdate () {
    this.ctx.checkedParams.id = this.ctx.user.id
    await UserModel.updateUser(this.ctx.checkedParams)
    this.json({ message: '更新信息成功' })
  }

  @login()
  @validate('user.avatar')
  async avatar () {
    this.ctx.checkedParams.id = this.ctx.user.id
    await UserModel.updateUser(this.ctx.checkedParams)
    this.json({ message: '更新头像成功' })
  }

  @login()
  async auth () {
    if (this.ctx.user.isAdmin) {
      this.json({
        message: '该用户为超级管理员，拥有所有权限',
        data: [{
          id: 1,
          name: 'special_permission_of_super_admin',
          desc: '超级管理员，拥有所有权限',
          order: 0
        }]
      })
    }

    const roleId = this.ctx.user.roleId
    const auth = await UserModel.getAuth(roleId)
    this.json({
      message: '获取权限信息成功',
      data: auth
    })
  }
}
