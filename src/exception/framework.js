import { Exception } from '../class'

class FilesNotFound extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      status: 90000,
      message: '文件未找到'
    })
  }
}

class InvalidParams extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      status: 10001,
      message: '参数错误'
    })
  }
}

export { FilesNotFound, InvalidParams }
