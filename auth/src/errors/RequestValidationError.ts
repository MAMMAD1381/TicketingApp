import { ValidationError } from "express-validator"
import AbstractError from './AbstractError'

class RequestValidationError extends AbstractError {
  errors
  statusCode
  constructor(errors: ValidationError[], statusCode = 400) {
    super('request validation error')
    this.errors = errors
    this.statusCode = statusCode
  }

  customizedResponse() {
    return this.errors.map((error) => {
      return {message: error.msg, field: error.type}
    })
  }
}

export default RequestValidationError