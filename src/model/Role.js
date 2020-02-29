import { Sequelize } from 'sequelize'
import { NotFound } from '../exception'
import { BaseModel } from './BaseModel'

export class RoleModel extends BaseModel {
  static async getAllRoles (page, pageSize) {
    const data = await this.pagination({
      page,
      pageSize
    })
    if (this.isEmpty(data.data)) {
      throw new NotFound({
        message: '分组数据不存在'
      })
    }
    return data
  }

  static async getRoleById (id) {
    const role = await this.findOne({
      where: { id }
    })
    if (!role) {
      throw new NotFound({ message: '该分组不存在' })
    }
    return role
  }

  static async createRole (data) {
    await this.create(data)
  }

  static async updateRole (data) {
    await this.update(data, {
      where: { id: data.id }
    })
  }

  static async deleteRole (id) {
    await this.getRoleById(id)
    await this.destroy({
      where: { id }
    })
  }
}

export const initRoleModel = (db) => {
  RoleModel.init({
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
      unique: true,
      allowNull: false
    },
    order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize: db,
    modelName: 'role',
    tableName: 'cms_role'
  })
}
