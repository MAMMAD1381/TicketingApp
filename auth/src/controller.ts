import { validationResult } from "express-validator"
import BasicError from './errors/BasicError'
import DatabaseConnectionError from './errors/DatabaseConnectionError'
import RequestValidationError  from './errors/RequestValidationError'
import { Request, Response, NextFunction } from "express"
import User from "./models/User"
import jwt from 'jsonwebtoken'


//? sing up
export async function signUp(req: Request, res: Response, next: NextFunction){
  const {email, password} = req.body

  //? validating body parameters
  const errors = validationResult(req)
  if(!errors.isEmpty()) return next(new RequestValidationError(errors.array()));

  //? checking existing user
  const duplicateUser = await User.findOne({email})
  if (duplicateUser) return next(new BasicError(`user with this ${email} email already exists`, 400))

  const user = await User.create({email: req.body.email, password: req.body.password})

  const jwtToken = user.getJwt()

  req.session ={
    jwtToken
  } 

  console.log(jwtToken)
  res.status(201).send({success: true, user, jwtToken})
}

//? sign in
export async function signIn(req: Request, res: Response, next: NextFunction){
  const {email, password} = req.body

  //? validating body parameters
  const errors = validationResult(req)
  if(!errors.isEmpty()) return next(new RequestValidationError(errors.array()));

  //? checking for existence of user
  const user = await User.findOne({email, password})
  if (!user) return next(new BasicError(`user with this ${email} email doesn't exists`, 404))

  console.log(user)
  res.status(201).send({success: true, user})
}

//? sing out
export function signOut(req: Request, res: Response, next: NextFunction){

  res.status(201).send({success: true})
}

//? me
export function getMe(req: Request, res: Response, next: NextFunction){

  res.status(201).send({success: true})
}