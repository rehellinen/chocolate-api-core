const { get, post, put, prefix, rest } = require('libs')

prefix('user', [
  get({
    self: 'user.userGet', // 用户获取信息
    '/self/auth': 'user.auth' // 用户获取自己的所有权限
  }),
  post({
    login: 'user.login', // 登录
    refresh: 'user.refresh' // 刷新access token
  }),
  put({
    '/self/info': 'user.userUpdate', // 用户修改信息
    '/self/pwd': 'user.userPassword', // 用户修改密码
    '/self/avatar': 'user.avatar', // 用户修改头像
    '/:id/password': 'user.password' // 管理员修改用户密码
  }),
  rest('user') // rest路由
])

prefix('files', [
  post({
    image: 'files.image'
  })
])

prefix('role', [
  get('/:roleId/auth', 'role.getAuth'), // 一个角色拥有的所有权限
  post('/:roleId/auth', 'role.setAuth'), // 增加一个角色的权限
  rest('role')
])

prefix('auth', [
  rest('auth')
])

prefix('mock', [
  get({
    count: 'mock.getCount',
    progress: 'mock.getProgress',
    image: 'mock.getImage'
  })
])


