import { Sequelize } from 'sequelize'
import { getConfig } from './class'

const userConf = getConfig('database')
const defaultConf = {
  dialect: 'mysql',
  logging: false,
  timezone: '+08:00',
  define: {
    charset: 'utf8',
    underscored: true, // 字段名使用下划线命名法
    freezeTableName: true, // 取消复数表名
    paranoid: true // 软删除
  }
}

const dbConfig = Object.assign(defaultConf, userConf)

const sequelize = new Sequelize(dbConfig)

sequelize.sync({
  force: false
})

export { sequelize }
