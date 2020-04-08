import { Sequelize } from 'sequelize'
import { NotFound } from '../exception'
import { BaseModel } from './BaseModel'

export class ArticleModel extends BaseModel {
  static async getAllArticle (page, pageSize) {
    const data = await this.pagination({
      page,
      pageSize
    })
    if (this.isEmpty(data.data)) {
      throw new NotFound({
        message: '文章列表为空'
      })
    }
    return data
  }

  static async getArticleById (id) {
    const auth = await this.findOne({
      where: { id }
    })
    if (!auth) {
      throw new NotFound({ message: '该文章不存在' })
    }
    return auth
  }

  static async createArticle (data) {
    await this.create(data)
  }

  static async updateArticle (data) {
    await this.update(data, {
      where: { id: data.id }
    })
  }

  static async deleteArticle (id) {
    await this.getArticleById(id)
    await this.destroy({
      where: { id }
    })
  }
}

export const initArticleModel = (db) => {
  ArticleModel.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    subtitle: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    detail: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, {
    sequelize: db,
    modelName: 'article',
    tableName: 'cms_article'
  })
}
