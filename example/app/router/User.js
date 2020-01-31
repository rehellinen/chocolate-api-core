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

  // 刷新Access令牌
  @refresh() @post('refresh')
  refresh = 'user.refresh'

  // 获取所有用户
  @admin() @get('all')
  getAll = 'user.getAll'

  // 管理员修改任一账号密码
  @admin() @put(':id')
  adminPassword = 'user.adminPassword'

  // 管理员编辑任一账号信息
  @login() @put(':id')
  adminEdit = 'user.adminEdit'

  // 管理员添加用户
  @admin() @validate('user.add') @post()
  add = 'user.add'

  // 管理员删除用户
  @admin() @del(':id')
  delete = 'user.delete'

  // 用户编辑信息
  @login() @put()
  edit = 'user.edit'

  // 用户修改头像
  @login() @put()
  avatar = 'user.avatar'

  // 用户修改密码
  @login() @put()
  password = 'user.password'
}
