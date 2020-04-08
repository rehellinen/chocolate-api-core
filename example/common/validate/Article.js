/**
 *  validate.js
 *  Create By rehellinen
 *  Create On 2018/10/12 22:38
 */
const { rule, Validator, extend } = require('libs')
const { Base } = require('./Base')

@extend(Base)
class Article extends Validator {
  scene = {
    create: ['title', 'subtitle', 'detail'],
    update: ['id', 'title', 'subtitle', 'detail']
  }

  @rule('require', '标题不能为空')
  title

  @rule('require', '副标题不能为空')
  subtitle

  @rule('require', '文章详情不能为空')
  detail
}

export { Article }
