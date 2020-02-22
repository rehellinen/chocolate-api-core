import { Sequelize, Model } from 'sequelize'

export class AuthModel extends Model {
  static async getAllAuth () {

  }
}

export const initAuthModel = (db) => {
  AuthModel.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    desc: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize: db,
    modelName: 'auth',
    tableName: 'cms_auth'
  })
}
