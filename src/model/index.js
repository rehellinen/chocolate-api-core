import { UserModel } from './User'
import { RoleModel } from './Role'
import { AuthModel } from './Auth'

export * from './User'
export * from './Auth'
export * from './Role'
export * from './BaseModel'

export const initRelation = () => {
  UserModel.belongsTo(RoleModel)
  RoleModel.belongsToMany(AuthModel, {
    through: 'cms_auth_role'
  })
  AuthModel.belongsToMany(RoleModel, {
    through: 'cms_auth_role'
  })
}
