import { BaseController } from './BaseController'

export class Files extends BaseController {
  image () {
    this.json({ message: '上传图片成功' })
  }
}
