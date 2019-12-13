import { Model } from '../class'

export class UserModel extends Model {
  constructor () {
    super({
      tableName: 'user'
    })
  }
}
