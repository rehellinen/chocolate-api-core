import { Sequelize } from 'sequelize'
import { NotFound, RepeatException, NoAuthority } from '../exception'
import { generatePwd, verifyPwd } from '../utils'
import { RoleModel } from './Role'
import { getTokens } from '../class'
import { BaseModel } from './BaseModel'

// TODO: Bug：软删除一个用户账户，再次添加会报错！
export class UserModel extends BaseModel {
  static async login (params) {
    let user
    try {
      user = await this.getUserByAccount(params.account)
    } catch (e) {
      if (e instanceof NotFound) {
        throw new NoAuthority({ message: '该账号不存在' })
      }
    }
    if (verifyPwd(params.password, user.password)) {
      return getTokens(user.id)
    } else {
      throw new NoAuthority({ message: '密码错误' })
    }
  }

  static async getAllUsers (page, pageSize) {
    const data = await this.pagination({
      page,
      pageSize,
      options: {
        include: [{
          model: RoleModel
        }]
      }
    })
    if (this.isEmpty(data.data)) {
      throw new NotFound({
        message: '用户数据不存在'
      })
    }
    return data
  }

  static async getUserByAccount (account) {
    const user = await this.findOne({
      where: { account },
      include: [{ model: RoleModel }]
    })
    if (!user) {
      throw new NotFound({ message: '该账号不存在' })
    }
    return user
  }

  static async getUserById (id) {
    const user = await this.findOne({
      where: { id },
      include: [{ model: RoleModel }]
    })
    if (!user) {
      throw new NotFound({ message: '该用户不存在' })
    }
    return user
  }

  static async createUser (data) {
    await this.isAccountExisted(data.account)
    await this.create(data)
  }

  static async updateUser (data) {
    if (data.account) {
      await this.isAccountExisted(data.account, data.id)
    }
    await this.update(data, {
      where: { id: data.id }
    })
  }

  static async isAccountExisted (account, id) {
    const user = await this.findOne({
      where: {
        account: account
      }
    })
    if (id) {
      if (user && user.id !== id) {
        throw new RepeatException({ message: '该账号已存在' })
      }
    } else {
      if (user) {
        throw new RepeatException({ message: '该账号已存在' })
      }
    }
  }

  static async deleteUser (id) {
    await this.getUserById(id)
    await this.destroy({
      where: { id }
    })
  }

  static async UserUpdatePwd ({ oldPassword, newPassword }, { id, password }) {
    if (!verifyPwd(oldPassword, password)) {
      throw new NoAuthority({ message: '原密码不正确' })
    }
    await this.update({
      password: newPassword
    }, {
      where: { id }
    })
  }

  static async getAuth (roleId) {
    const role = await RoleModel.getRoleById(roleId)
    const auth = await role.getAuths({
      attributes: ['id', 'name', 'desc', 'order']
    })
    return auth
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
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
      set (val) {
        this.setDataValue('password', generatePwd(val))
      }
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize: db,
    modelName: 'user',
    tableName: 'cms_user'
  })
}
