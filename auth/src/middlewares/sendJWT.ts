import { Request, Response, NextFunction } from 'express'
import RequestCustom from '../customs/RequestCustom'

async function sendJWT(req: RequestCustom, res: Response, next: NextFunction) {
  const user = req.user
  const jwtToken = await user.getJwt()

  res
    .status(200)
    .cookie('JWT_TOKEN', jwtToken, {
      maxAge: Number(process.env.JWT_TOKEN_EXPIRE) * 24 * 60 * 60 * 1000, //? expire_env variable is in days
    })
    .send({ success: true, user, token: jwtToken })
}

export default sendJWT
