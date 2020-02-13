import { Exception } from './Exception'

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

class GeneralError extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      status: 10002,
      message: '框架内部错误'
    })
  }
}

export { FilesNotFound, InvalidParams, GeneralError }
