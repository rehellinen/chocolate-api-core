import { Sequelize, Model } from 'sequelize'
import { NotFound, RepeatException } from '../exception'
import { generatePwd } from '../utils'

export class UserModel extends Model {
  static async getAllUsers () {
    const users = await this.findAll()
    if (users.length === 0) {
      throw new NotFound({
        message: '用户数据不存在'
      })
    }
    return users
  }

  async getUserByAccount (account) {
    const user = await this.getOne({
      condition: { account },
      relation: ['group']
    })
    if (!user) {
      throw new NotFound({ message: '该账号不存在' })
    }
    return user
  }

  async getUserById (id) {
    const user = await this.getOne({
      condition: { id },
      relation: ['group']
    })
    if (!user) {
      throw new NotFound({ message: '该用户不存在' })
    }
    return user
  }

  async createUser (data) {
    data.password = generatePwd(data.password)
    const user = await this.getOne({
      condition: {
        account: data.account
      }
    })
    if (user) {
      throw new RepeatException({ message: '该账号已存在' })
    }
    await this.create(data)
  }

  async updateUser (data) {
    await this.updateById(data.id, data)
  }

  async updatePassword (data) {
    data.password = generatePwd(data.password)
    await this.updateById(data.id, data)
  }
}

export const initUserModel = (db) => {
  UserModel.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    account: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize: db,
    modelName: 'user',
    tableName: 'cms_user'
  })
}
