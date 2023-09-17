import { validationResult } from 'express-validator'
import BasicError from '../errors/BasicError'
import RequestValidationError from '../errors/RequestValidationError'
import { NextFunction } from 'express'
import User from '../models/User'
import { RequestCustom, ResponseCustom } from '../customs/CustomTypes'

//? sing up
async function signUp(req: RequestCustom, res: ResponseCustom, next: NextFunction) {
  const { email, password } = req.body

  //? validating body parameters
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(new RequestValidationError(errors.array()))

  //? checking existing user
  const duplicateUser = await User.findOne({ email })
  if (duplicateUser)
    return next(new BasicError(`user with this ${email} email already exists`, 400))

  const user = await User.create({ email, password })

  res.locals.user = user
  res.locals.statusCode = 201


  //? send jwt token
  next()
}

export default signUp