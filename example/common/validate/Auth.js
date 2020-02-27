/**
 *  validate.js
 *  Create By rehellinen
 *  Create On 2018/10/12 22:38
 */
import { rule, Validator, extend } from 'libs'
import { Base } from './Base'

@extend(Base)
class Auth extends Validator {
  scene = {
    create: ['name', 'desc'],
    update: ['id', 'name', 'desc']
  }

  @rule('require', '名称不能为空')
  name

  @rule('require', '描述不能为空')
  desc
}

export { Auth }
