const {
  Controller,
  AuthModel,
  admin, validate
} = require('libs')

class Auth extends Controller {
  @admin()
  @validate('base.page')
  async getAll () {
    const { page, pageSize } = this.ctx.checkedParams
    const auth = await AuthModel.getAllAuth(page, pageSize)
    this.json({
      message: '获取所有权限信息成功',
      data: auth
    })
  }

  @admin()
  @validate('base.id')
  async getOne () {
    const auth = await AuthModel.getAuthById(this.ctx.checkedParams.id)
    this.json({
      message: '获取权限信息成功',
      data: auth
    })
  }

  @admin()
  @validate('auth.create')
  async create () {
    await AuthModel.createAuth(this.ctx.checkedParams)
    this.json({ message: '添加权限信息成功' })
  }

  @admin()
  @validate('auth.update')
  async update () {
    await AuthModel.updateAuth(this.ctx.checkedParams)
    this.json({ message: '更新权限信息成功' })
  }

  @admin()
  @validate('base.id')
  async delete () {
    await AuthModel.deleteAuth(this.ctx.checkedParams.id)
    this.json({ message: '删除权限信息成功' })
  }
}

export default Auth
