import { Model } from '../class'
import { NotFound } from '../exception'

export class UserModel extends Model {
  constructor () {
    super({
      tableName: 'user'
    })
  }

  getUserByAccount (account) {
    const user = this.getOne({
      condition: { account }
    })
    if (!user) {
      throw new NotFound({ message: '该账号不存在' })
    }
    return user
  }
}
