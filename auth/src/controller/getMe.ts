import { Response, NextFunction } from 'express'
import RequestCustom from '../customs/RequestCustom'


//? me
async function getMe(req: RequestCustom, res: Response, next: NextFunction) {
  res.status(200).send({ success: true, user: req.user })
}

export default getMe

