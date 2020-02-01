/**
 *  validate.js
 *  Create By rehellinen
 *  Create On 2018/10/12 22:38
 */
import { rule, Validator, extend } from 'libs'
import { BaseValidator } from './BaseValidator'

@extend(BaseValidator)
class User extends Validator {
  scene = {
    login: ['account', 'password'],
    create: ['account', 'name', 'password', 'avatar', 'groupId', 'status', 'admin'],
    update: ['id', 'account', 'name', 'password', 'avatar', 'groupId', 'status', 'admin'],
    password: ['password'],
    avatar: ['avatar']
  }

  @rule('require', '登录账户不能为空')
  account

  @rule('require', '密码不能为空')
  password

  @rule('require', '头像不能为空')
  avatar

  @rule('require', '权限组ID不能为空')
  @rule('isInt', '权限组ID必须为正整数', { min: 1 })
  groupId

  @rule('require', '状态不能为空')
  @rule('isInt', '状态范围错误', { min: 0, max: 1 })
  status

  @rule('require', `'是否为管理员'不能为空`)
  @rule('isInt', 'admin范围错误', { min: 0, max: 1 })
  admin
}

export { User }
