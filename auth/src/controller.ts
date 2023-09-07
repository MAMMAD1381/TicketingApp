import { validationResult } from "express-validator"
import BasicError from './errors/BasicError'
import DatabaseConnectionError from './errors/DatabaseConnectionError'
import RequestValidationError  from './errors/RequestValidationError'
import { Request, Response, NextFunction } from "express"


export function signUp(req: Request, res: Response, next: NextFunction){
  const errors = validationResult(req)
  if(!errors.isEmpty()) next(new RequestValidationError(errors.array()));
  next(new BasicError())
  res.status(201).send({success: true})
}

export function signIn(req: Request, res: Response, next: NextFunction){

  res.status(201).send({success: true})
}

export function signOut(req: Request, res: Response, next: NextFunction){

  res.status(201).send({success: true})
}

export function getMe(req: Request, res: Response, next: NextFunction){

  res.status(201).send({success: true})
}