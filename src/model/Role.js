import { Sequelize, Model } from 'sequelize'

export class RoleModel extends Model {
}

export const initRoleModel = (db) => {
  RoleModel.init({
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
    modelName: 'role',
    tableName: 'cms_role'
  })
}
