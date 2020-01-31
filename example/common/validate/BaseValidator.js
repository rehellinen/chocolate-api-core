const { Validator, rule } = require('libs')

export class BaseValidator extends Validator {
  @rule('isInt', 'id必须为正整数', { min: 1 })
  @rule('require', 'id不能为空')
  id

  @rule('require', '名称不能为空')
  name

  @rule('require', '序号不能为空')
  @rule('isInt', '序号必须为非负整数', { min: 0 })
  order
}
