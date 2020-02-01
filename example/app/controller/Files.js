const { Controller } = require('libs')

export class Files extends Controller {
  image () {
    this.json({ message: '上传图片成功' })
  }
}
