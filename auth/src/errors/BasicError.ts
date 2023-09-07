import AbstractError from './AbstractError'

class BasicErorr extends AbstractError {
  statusCode
  msg
  constructor(msg = 'something went wrong', statusCode = 500) {
    super('new error occurred')
    this.statusCode = statusCode
    this.msg = msg
  }

  customizedResponse(){
      return [{message: `new error: ${this.msg}`}]
  }
}

export default BasicErorr
