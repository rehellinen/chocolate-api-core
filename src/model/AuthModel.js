const { Model } = require('../class')

export class AuthModel extends Model {
  constructor () {
    super({
      tableName: 'auth'
    })
  }
}
