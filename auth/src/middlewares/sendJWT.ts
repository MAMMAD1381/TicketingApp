import {NextFunction} from 'express'
import {RequestCustom, ResponseCustom} from '../customs/CustomTypes'

async function sendJWT(req: RequestCustom, res: ResponseCustom, next: NextFunction) {
  const user = res.locals.user
  const statusCode = res.locals.statusCode
  const jwtToken = await user.getJwt()

  res
    .status(statusCode)
    .cookie('JWT_TOKEN', jwtToken, {
      maxAge: Number(process.env.JWT_TOKEN_EXPIRE) * 24 * 60 * 60 * 1000, //? expire_env variable is in days
    })
    .send({ success: true, user, token: jwtToken })
}

export default sendJWT
