import { Model } from 'sequelize'
import { config } from '../class'

export class BaseModel extends Model {
  static async pagination ({ page = 1, pageSize, options }) {
    pageSize = pageSize || config.get('model.page_size')

    options.limit = pageSize
    options.offset = (page - 1) * pageSize

    const res = await this.findAndCountAll(options)
    return {
      page,
      pageSize,
      total: res.count,
      data: res.rows
    }
  }
}
