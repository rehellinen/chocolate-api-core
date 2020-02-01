import { Model } from '../class'
import { NotFound, RepeatException } from '../exception'
import { generatePwd } from '../utils'

export class UserModel extends Model {
  constructor () {
    super({
      tableName: 'user'
    })
  }

  async getOneUser (id) {
    const user = await this.getOneById(id)
    if (!user) {
      throw new NotFound({ message: '该用户不存在' })
    }
    return user
  }

  async getAllUsers () {
    const users = await new UserModel().getAll({})
    if (!users) {
      throw new NotFound({
        message: '用户不存在'
      })
    }
    return users
  }

  async getUserByAccount (account) {
    const user = await this.getOne({
      condition: { account }
    })
    if (!user) {
      throw new NotFound({ message: '该账号不存在' })
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

  async updateUser (user, data) {
    if (user.account !== data.account) {
      await this.getUserByAccount(data.account)
    }
    await this.updateById(user.id, data)
  }

  async updateUserAdmin (data) {
    const user = await this.getOneById(data.id)
    if (!user) {
      throw new NotFound({
        message: '不存在该用户'
      })
    }
    await this.updateUser(user, data)
    this.json({ message: '更改信息成功' })
  }

  async updatePassword (user, data) {
    data.password = generatePwd(data.password)
    await this.updateById(user.id, data)
  }

  async updatePasswordAdmin (data) {
    data.password = generatePwd(data.password)
    await this.updateById(data.id, data)
  }
}
