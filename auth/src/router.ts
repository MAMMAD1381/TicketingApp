import { Router } from 'express'
import {signUp, signIn, signOut, getMe} from './controller'
import {authValidation} from './utilities/authValidator'
const router = Router()

router.route('/signup').post(authValidation, signUp)

router.route('/signin').post(authValidation, signIn)

router.route('/signout').post(signOut)

router.route('/me').get(getMe)

export default router