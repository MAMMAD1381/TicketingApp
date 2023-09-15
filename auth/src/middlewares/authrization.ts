import { Request, Response, NextFunction } from 'express'
import NotAuthorizedError from '../errors/NotAuthorizedError'
import AuthorizationProcessError from '../errors/AuthorizationProcessError'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import RequestCustom from '../customs/RequestCustom'

async function authorization(req: RequestCustom, res: Response, next: NextFunction) {

  let bearerKey = req.headers.authorization
  let jwtToken = req.cookies.JWT_TOKEN

  //? using bearer key if available for authorization
  if (bearerKey) {
    bearerKey = bearerKey.split(' ')[1]

    let payload
    try {
      payload = await jwt.verify(bearerKey, process.env.JWT_SECRET!) as { [key: string]: any };
      
      //? checking for id on payload
      if(!payload.id) return next(new AuthorizationProcessError('an id must be provided in payload'))

      //? cheching for existence of user with provided id
      const user = await User.findById(payload.id)
      if(!user) return next(new NotAuthorizedError(`user doesn't exists pls login`))

      //? checking for provided email
      if(user.email !== payload.email) return next(new NotAuthorizedError(`email doesn't match pls login`))

      req.user = user
      //? user is authorized and assigned
      return next()
    

    } catch (error) {
      return next(new AuthorizationProcessError('problem in processing the jwt token of bearer key'))
    }
  }
  
  //? using cookie if available for authorization
  if(jwtToken){
    
    let payload
    try {
      payload = await jwt.verify(jwtToken, process.env.JWT_SECRET!) as { [key: string]: any };
      
      //? checking for id on payload
      if(!payload.id) return next(new AuthorizationProcessError('an id must be provided in payload'))

      //? cheching for existence of user with provided id
      const user = await User.findById(payload.id)
      if(!user) return next(new NotAuthorizedError(`user doesn't exists pls login`))

      //? checking for provided email
      if(user.email !== payload.email) return next(new NotAuthorizedError(`email doesn't match pls login`))

      req.user = user
      //? user is authorized and assigned
      return next()

    } catch (error) {
      return next(new AuthorizationProcessError('problem in processing the jwt token of bearer key'))
    }
  }

  //? reaching here means neither bearer key was provided nor jwtToken in cookie session
  return next(new NotAuthorizedError(`providing bearer key or jwt cookie is provided pls login`))
}

export default authorization
