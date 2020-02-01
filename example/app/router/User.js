const {
  prefix,
  get, post, del, put,
  login, admin, refresh,
  validate
} = require('libs')

@prefix('user')
class UserRouter {
  // 登录
  @validate('user.login') @post('login')
  login = 'user.login'

  // 更新Access令牌
  @refresh() @post('refresh')
  refresh = 'user.refresh'

  // 获取所有用户
  @admin() @get('all')
  getAll = 'user.getAll'

  // 管理员更新任一账号密码
  @admin() @validate('user.password') @put(':id')
  adminPassword = 'user.adminPassword'

  // 管理员更新任一账号信息
  @admin() @validate('user.update') @put(':id')
  adminUpdate = 'user.adminUpdate'

  // 管理员添加用户
  @admin() @validate('user.create') @post()
  create = 'user.create'

  // 管理员删除用户
  @admin() @del(':id')
  delete = 'user.delete'

  // 用户编辑信息
  @login() @validate('user.update') @put()
  update = 'user.update'

  // 用户修改头像
  @login() @validate('user.avatar') @put()
  avatar = 'user.avatar'

  // 用户修改密码
  @login() @validate('user.password') @put()
  password = 'user.password'
}
