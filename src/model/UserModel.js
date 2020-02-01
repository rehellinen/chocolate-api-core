import { Model } from '../class'
import { NotFound, RepeatException } from '../exception'

export class UserModel extends Model {
  constructor () {
    super({
      tableName: 'user'
    })
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

  async saveUser (data) {
    const user = await this.getOne({
      condition: {
        account: data.account
      }
    })
    if (user) {
      throw new RepeatException({ message: '该账号已存在' })
    }
    await this.save(data)
  }
}
