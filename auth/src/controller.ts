import { validationResult } from 'express-validator'
import BasicError from './errors/BasicError'
import RequestValidationError from './errors/RequestValidationError'
import { Request, Response, NextFunction } from 'express'
import User from './models/User'
import Password from './utilities/password'
import RequestCustom from './customs/RequestCustom'

//? sing up
export async function signUp(req: RequestCustom, res: Response, next: NextFunction) {
  const { email, password } = req.body

  //? validating body parameters
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(new RequestValidationError(errors.array()))

  //? checking existing user
  const duplicateUser = await User.findOne({ email })
  if (duplicateUser)
    return next(new BasicError(`user with this ${email} email already exists`, 400))

  const user = await User.create({ email, password })

  req.user = user

  //? send jwt token
  next()
}

//? sign in
export async function signIn(req: RequestCustom, res: Response, next: NextFunction) {
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

  req.user = user

  //? send jwt token
  next()
}

//? sing out
export function signOut(req: Request, res: Response, next: NextFunction) {
  res.status(201).send({ success: true })
}

//? me
export function getMe(req: RequestCustom, res: Response, next: NextFunction) {
  res.status(200).send({ success: true , user: req.user})
}
