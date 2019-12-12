const { Model } = require('libs')

export class IndexModel extends Model {
  constructor () {
    super({
      tableName: 'article'
    })
  }
}
