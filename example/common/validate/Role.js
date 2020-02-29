/**
 *  validate.js
 *  Create By rehellinen
 *  Create On 2018/10/12 22:38
 */
import { rule, Validator, extend } from 'libs'
import { Base } from './Base'

@extend(Base)
class Role extends Validator {
  scene = {
    getAuth: ['roleId'],
    auth: ['roleId', 'authIds'],
    create: ['name', 'desc'],
    update: ['id', 'name', 'desc']
  }

  @rule('require', '名称不能为空')
  name

  @rule('require', '描述不能为空')
  desc

  @rule('require', '角色ID不能为空')
  roleId

  @rule('require', '权限ID不能为空')
  authIds
}

export { Role }
