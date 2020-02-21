import { Exception } from './Exception'

class ParamsException extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 400,
      status: 20000,
      message: '参数错误'
    })
  }
}

class NotFound extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 404,
      status: 10001,
      message: '资源不存在'
    })
  }
}

class RepeatException extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 400,
      status: 30200,
      message: '数据重复'
    })
  }
}

class UploadException extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 400,
      status: 30300,
      message: '上传文件失败'
    })
  }
}

class Success extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 200,
      status: 1,
      message: '成功'
    })
  }
}

export { ParamsException, NotFound, RepeatException, UploadException, Success }
