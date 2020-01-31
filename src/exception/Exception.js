/**
 * 自定义异常基类
 */
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
    const fields = ['httpCode', 'status', 'data']
    fields.forEach(item => {
      if (Reflect.has(config, item) && !Reflect.has(this, item)) {
        this[item] = config[item]
      }
    })
    if (!this.message) {
      this.message = config.message
    }
  }

  getError () {
    return {
      status: this.status,
      message: this.message,
      data: this.data || {}
    }
  }
}
