const { Controller } = require('../../../src')

export class Index extends Controller {
  index () {
    this.json({
      message: '成功访问'
    })
  }

  upload () {
    this.json({
      message: '上传成功'
    })
  }
}
