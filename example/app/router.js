const { get, post, put, prefix, rest } = require('libs')

prefix('user', [
  get({
    self: 'user.userGet' // 用户获取信息
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
  rest('role')
])

prefix('auth', [
  rest('auth')
])


