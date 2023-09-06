class RequestValidationError extends Error {
  constructor(errors, statusCode = 400) {
    super()
    console.log(errors)
    this.errors = errors.map((error) => {
      return {message: `${error.value} is a wrong format for ${error.path}. ${error.msg}`, field: error.path}
    })
    this.statusCode = statusCode
  }
}

module.exports = RequestValidationError