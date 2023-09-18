import { Response, NextFunction } from 'express'
import { RequestCustom } from '../customs/CustomTypes'
import NotAuthorizedError from '../errors/NotAuthorizedError'

//? me
async function getMe(req: RequestCustom, res: Response, next: NextFunction) {
  if (res.locals.bearerAuthorized || res.locals.cookieAuthorized)
    res.status(200).send({ success: true, user: res.locals.user})
  else
    next(new NotAuthorizedError('using bearer token or jwt cookie is required for identification purposes'))
}

export default getMe
