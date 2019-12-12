const {
  prefix,
  get,
  post,
  auth,
  validate,
  middleware,
  upload,
  config
} = require('../../../src')

const scope = config.getConfig('token.scope')

@prefix('index')
class IndexRouter {
  @validate('index', 'add') @auth(scope.SUPER) @post('')
  index = 'index.index'

  @middleware(upload()) @post('upload')
  upload = 'index.upload'
}