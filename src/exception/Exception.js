export class Exception extends Error {
  constructor (config = {}) {
    super()
    const fields = ['httpCode', 'status', 'message', 'data']
    fields.forEach(item => {
      if (Reflect.has(config, item)) {
        this[item] = config[item]
      }
    })
  }

  setDefault (config = {}) {
    const fields = ['httpCode', 'status', 'message']
    fields.forEach(item => {
      if (Reflect.has(config, item) && !Reflect.has(this, item)) {
        this[item] = config[item]
      }
    })
  }

  getError () {
    return {
      status: this.status,
      message: this.message,
      data: this.data || {}
    }
  }
}
