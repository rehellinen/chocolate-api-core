const { Model } = require('../../../src')

export class IndexModel extends Model {
  constructor () {
    super({
      tableName: 'article'
    })
  }
}
