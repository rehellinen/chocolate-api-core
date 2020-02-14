import { Model } from '../class'
import { NotFound, RepeatException } from '../exception'
import { generatePwd } from '../utils'

export class UserModel extends Model {
  constructor () {
    super({
      tableName: 'user'
    })
  }

  async getAllUsers () {
    const users = await this.getAll({})
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

  async updateUser (data) {
    await this.updateById(data.id, data)
  }

  async updatePassword (data) {
    data.password = generatePwd(data.password)
    await this.updateById(data.id, data)
  }
}
