import { NextFunction } from 'express'
import NotAuthorizedError from '../../errors/NotAuthorizedError'
import AuthorizationProcessError from '../../errors/AuthorizationProcessError'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import {RequestCustom, ResponseCustom} from '../../customs/CustomTypes'

async function jwtCookieAuthorization(req: RequestCustom, res: ResponseCustom, next: NextFunction) {

  let jwtToken = req.cookies.JWT_TOKEN
  
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

      res.locals.user = user
      res.locals.cookieAuthorized = true
      //? user is authorized and assigned
      return next()

    } catch (error) {
      res.locals.cookieAuthorized = false
      // return next(new AuthorizationProcessError('problem in processing the jwt token of cookie'))
    }
  }

  next()
}

export default jwtCookieAuthorization
