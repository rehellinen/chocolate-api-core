const { Validator, rule } = require('libs')

export class Base extends Validator {
  scene = {
    id: ['id'],
    order: ['order'],
    page: ['page', 'pageSize']
  }

  @rule('isInt', 'id必须为正整数', { min: 1 })
  @rule('require', 'id不能为空')
  id

  @rule('require', '序号不能为空')
  @rule('isInt', '序号必须为非负整数', { min: 0 })
  order

  @rule('optional')
  @rule('isInt', '页码必须为正整数', { min: 1 })
  page

  @rule('optional')
  @rule('isInt', '分页大小必须为正整数', { min: 1 })
  pageSize
}
