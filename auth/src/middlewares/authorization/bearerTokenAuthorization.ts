import { NextFunction } from 'express'
import NotAuthorizedError from '../../errors/NotAuthorizedError'
import AuthorizationProcessError from '../../errors/AuthorizationProcessError'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import {RequestCustom, ResponseCustom} from '../../customs/CustomTypes'

async function bearerTokenAuthorization(req: RequestCustom, res: ResponseCustom, next: NextFunction) {

  let bearerKey = req.headers.authorization

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

      res.locals.user = user
      res.locals.bearerAuthorized = true
      //? user is authorized and assigned
      return next()
    

    } catch (error) {
      res.locals.bearerAuthorized = false
      // return next(new AuthorizationProcessError('problem in processing the jwt token of bearer key'))
    }
  }

  next()
}

export default bearerTokenAuthorization
