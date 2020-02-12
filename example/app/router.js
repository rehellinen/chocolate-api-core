const { get, post, del, put } = require('libs')


post({
  login: 'user.login',
  refresh: 'user.refresh'
})
get('all', 'user.getAll')
