const { Controller, config, upload, middleware, getTodayDate, UploadException } = require('libs')

export class Files extends Controller {
  @middleware(upload())
  image () {
    if (!this.ctx.req.file) {
      throw new UploadException({ message: '上传图片失败' })
    }
    const filename = this.ctx.req.file.filename
    let prefix = config.get('url_prefix')
    if (prefix.endsWith('/')) {
      prefix = prefix.slice(0, -1)
    }
    const path = `${prefix}/${getTodayDate()}/${filename}`

    this.json({
      message: '上传图片成功',
      data: { path }
    })
  }
}
