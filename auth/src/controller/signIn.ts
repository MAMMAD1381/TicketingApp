import { validationResult } from 'express-validator'
import BasicError from '../errors/BasicError'
import RequestValidationError from '../errors/RequestValidationError'
import { NextFunction } from 'express'
import User from '../models/User'
import Password from '../utilities/password'
import {RequestCustom, ResponseCustom} from '../customs/CustomTypes'


//? sign in
async function signIn(req: RequestCustom, res: ResponseCustom, next: NextFunction) {
  const { email, password } = req.body

  //? validating body parameters
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(new RequestValidationError(errors.array()))

  //? checking for existence of user
  const user = await User.findOne({ email }).select('+password')
  if (!user) return next(new BasicError(`wrong credentials`, 404))

  //? is password correct
  const isPassCorrect = await Password.compare(password, user.password)
  if (!isPassCorrect) return next(new BasicError(`wrong credentials`, 404))

  res.locals.user = user
  res.locals.statusCode = 200

  //? send jwt token
  next()
}

export default signIn