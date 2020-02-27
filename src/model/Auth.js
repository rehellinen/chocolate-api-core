import { Sequelize } from 'sequelize'
import { NotFound } from '../exception'
import { BaseModel } from './BaseModel'

export class AuthModel extends BaseModel {
  static async getAllAuth (page, pageSize) {
    const data = await this.pagination({
      page,
      pageSize
    })
    if (data.data.length === 0) {
      throw new NotFound({
        message: '权限信息不存在'
      })
    }
    return data
  }

  static async getAuthById (id) {
    const auth = await this.findOne({
      where: { id }
    })
    if (!auth) {
      throw new NotFound({ message: '该权限信息不存在' })
    }
    return auth
  }

  static async createAuth (data) {
    await this.create(data)
  }

  static async updateAuth (data) {
    await this.update(data, {
      where: { id: data.id }
    })
  }

  static async deleteAuth (id) {
    await this.getAuthById(id)
    await this.destroy({
      where: { id }
    })
  }
}

export const initAuthModel = (db) => {
  AuthModel.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    desc: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize: db,
    modelName: 'auth',
    tableName: 'cms_auth'
  })
}
