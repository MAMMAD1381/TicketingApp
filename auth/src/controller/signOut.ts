import { Request, Response, NextFunction } from 'express'


//? sing out
export function signOut(req: Request, res: Response, next: NextFunction) {
  res.status(200).clearCookie('JWT_TOKEN').send({ success: true, user: null })
}

export default signOut