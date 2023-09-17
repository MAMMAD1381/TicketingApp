import { Response, NextFunction } from 'express'
import {RequestCustom} from '../customs/CustomTypes'


//? me
async function getMe(req: RequestCustom, res: Response, next: NextFunction) {
  res.status(200).send({ success: true, user: res.locals.user })
}

export default getMe

