/**
 *  validate.js
 *  Create By rehellinen
 *  Create On 2018/10/12 22:38
 */
const { rule, Validator, extend } = require('libs')
const { Base } = require('./Base')

@extend(Base)
// TODO: isAdmin换成布尔值
class User extends Validator {
  scene = {
    login: ['account', 'password'],
    create: ['account', 'name', 'password', 'avatar', 'roleId'],
    update: ['id', 'account', 'name', 'avatar', 'roleId'],
    userUpdate: ['account', 'name', 'avatar', 'roleId'],
    password: ['id', 'password'],
    userPassword: ['oldPassword', 'newPassword'],
    avatar: ['avatar']
  }

  @rule('require', '名称不能为空')
  name

  @rule('require', '登录账户不能为空')
  account

  @rule('require', '密码不能为空')
  password

  @rule('require', '原密码不能为空')
  oldPassword

  @rule('require', '新密码不能为空')
  newPassword

  @rule('require', '头像不能为空')
  avatar

  @rule('require', '权限组ID不能为空')
  @rule('isInt', '权限组ID必须为正整数', { min: 1 })
  roleId
}

export { User }
