import Multer from 'koa-multer'
import { dirExists, getTodayDate, rRoot, generateSalt } from '../utils'
import { getConfig } from '../class'

export const upload = () => async (ctx, next) => {
  // 获取当前年月日组合而成的字符串
  const today = getTodayDate()
  // 判断是否有存放文件的文件夹
  const destination = rRoot(`${getConfig('UPLOAD.DIR')}/${today}`)
  await dirExists(destination)
  // koa-multer中间件
  const storage = Multer.diskStorage({
    destination,
    filename (ctx, file, cb) {
      const ext = file.originalname.split('.').pop()
      const filename = Date.now() + generateSalt(5) + '.' + ext
      cb(null, filename)
    }
  })
  await Multer({ storage })
    .single(getConfig('UPLOAD.NAME'))(ctx, next)
}
