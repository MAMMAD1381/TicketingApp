class BasicErorr extends Error {
  constructor(msg = 'something went wrong', statusCode = 500) {
    super()
    this.statusCode = statusCode
    this.errors = [{message: `new error: ${msg}`}]
  }
}

module.exports = BasicErorr
