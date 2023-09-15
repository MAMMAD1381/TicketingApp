import { Router } from 'express'
import {signUp, signIn, signOut, getMe} from './controller'
import {authValidation} from './utilities/authValidator'
import sendJWT from './middlewares/sendJWT'
import authorization from './middlewares/authrization'
const router = Router()

router.route('/signup').post(authValidation, signUp, sendJWT)

router.route('/signin').post(authValidation, signIn, sendJWT)

router.route('/signout').post(signOut)

router.route('/me').get(authorization, getMe)

export default router