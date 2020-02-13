import { get, post, put, del } from './methods'

const config = [
  {
    __noUrl__: 'getAll', // 获取所有信息
    ':id': 'getOne' // 根据id获取一条信息
  },
  {
    __noUrl__: 'create' // 新增一条信息
  },
  {
    ':id': 'update'
  },
  {
    ':id': 'delete'
  }
]

export const rest = (fileName) => {
  const methods = [get, post, put, del]
  const resArr = []
  for (const [index, item] of config.entries()) {
    for (const [key, val] of Object.entries(item)) {
      const res = methods[index](
        key === '__noUrl__' ? '' : key,
        `${fileName}.${val}`
      )
      resArr.push(res)
    }
  }
  return resArr
}
