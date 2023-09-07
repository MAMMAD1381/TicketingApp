import AbstractError from './AbstractError'

class DatabaseConnectionError extends AbstractError {
    statusCode
    reason
    constructor(reason = 'database connection error', statusCode = 500) {
      super()
      this.reason = reason
      this.statusCode = statusCode
    }

    customizedResponse(){
        return [{message: `new error occured because of: ${this.reason}`}]
    }
}

export default DatabaseConnectionError