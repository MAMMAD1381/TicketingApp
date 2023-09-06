class DatabaseConnectionError extends Error {
    constructor(reason = 'database connection error', statusCode = 500) {
      super()
      this.errors = [{message: `new error occured because of: ${reason}`}]
      this.statusCode = statusCode
    }
}

module.exports = DatabaseConnectionError