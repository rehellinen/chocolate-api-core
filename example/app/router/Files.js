const {
  prefix,
  post,
  login,
  middleware,
  upload
} = require('libs')

@prefix('files')
class FilesRouter {
  @middleware(upload()) @post('image')
  image = 'files.image'
}
