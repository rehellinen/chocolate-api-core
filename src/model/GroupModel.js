const { Model } = require('../class')

export class GroupModel extends Model {
  constructor () {
    super({
      tableName: 'group'
    })
  }
}
