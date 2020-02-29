import {AuthModel} from '../../../src/model'

const {
  Controller,
  RoleModel,
  admin,
  validate
} = require('libs')

export class Role extends Controller {
  @admin()
  @validate('base.page')
  async getAll () {
    const { page, pageSize } = this.ctx.checkedParams
    const users = await RoleModel.getAllRoles(page, pageSize)
    this.json({
      message: '获取所有角色成功',
      data: users
    })
  }

  @admin()
  @validate('base.id')
  async getOne () {
    const user = await RoleModel.getRoleById(this.ctx.checkedParams.id)
    this.json({
      message: '获取角色成功',
      data: user
    })
  }

  @admin()
  @validate('role.create')
  async create () {
    await RoleModel.createRole(this.ctx.checkedParams)
    this.json({ message: '添加角色成功' })
  }

  @admin()
  @validate('role.update')
  async update () {
    await RoleModel.updateRole(this.ctx.checkedParams)
    this.json({ message: '更新角色成功' })
  }

  @admin()
  @validate('base.id')
  async delete () {
    await RoleModel.deleteRole(this.ctx.checkedParams.id)
    this.json({ message: '删除角色成功' })
  }

  @admin()
  @validate('role.getAuth')
  async getAuth () {
    const { roleId } = this.ctx.checkedParams
    const role = await RoleModel.getRoleById(roleId)
    const auth = await role.getAuths()
    this.json({
      message: '获取权限成功',
      data: auth
    })
  }

  @admin()
  @validate('role.auth')
  async setAuth () {
    const { roleId, authIds } = this.ctx.checkedParams
    const auth = await AuthModel.getAuthByIds(authIds)
    const role = await RoleModel.getRoleById(roleId)
    await role.setAuths(auth)
    this.json({ message: '设置权限成功' })
  }
}
