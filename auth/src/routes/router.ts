import { Router } from 'express'

//? controllers
import signUp from '../controller/signUp'
import signIn  from '../controller/signIn'
import signOut from '../controller/signOut'
import getMe from '../controller/getMe'

//? middlewares
import { authValidation } from '../utilities/authValidator'
import sendJWT from '../middlewares/sendJWT'
import bearerTokenAuthorization from '../middlewares/authorization/bearerTokenAuthorization'
import jwtCookieAuthorization from '../middlewares/authorization/jwtCookieAuthorization'

const router = Router()

router.route('/signup').post(authValidation, signUp, sendJWT)

router.route('/signin').post(authValidation, signIn, sendJWT)

router.route('/signout').post(signOut)

router.route('/me').get(bearerTokenAuthorization, jwtCookieAuthorization, getMe)

export default router
