const {
  Controller,
  ArticleModel,
  login, validate
} = require('libs')

export class Article extends Controller {
  @login()
  @validate('base.page')
  async getAll () {
    const { page, pageSize } = this.ctx.checkedParams
    const auth = await ArticleModel.getAllArticle(page, pageSize)
    this.json({
      message: '获取所有文章成功',
      data: auth
    })
  }

  @login()
  @validate('base.id')
  async getOne () {
    const auth = await ArticleModel.getArticleById(this.ctx.checkedParams.id)
    this.json({
      message: '获取文章信息成功',
      data: auth
    })
  }

  @login()
  @validate('article.create')
  async create () {
    await ArticleModel.createArticle(this.ctx.checkedParams)
    this.json({ message: '添加文章成功' })
  }

  @login()
  @validate('article.update')
  async update () {
    await ArticleModel.updateArticle(this.ctx.checkedParams)
    this.json({ message: '更新文章成功' })
  }

  @login()
  @validate('base.id')
  async delete () {
    await ArticleModel.deleteArticle(this.ctx.checkedParams.id)
    this.json({ message: '删除文章成功' })
  }
}
