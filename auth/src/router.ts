// const express = require('express')
import express from 'express'
// const router = express.Router()
import { Router } from 'express'
// const {signUp, signIn, signOut, getMe} = require('./controller')
import {signUp, signIn, signOut, getMe} from './controller'
// const {authValidation} = require('./utilities/authValidator')
import {authValidation} from './utilities/authValidator'
const router = Router()

router.route('/signup').post(authValidation, signUp)

router.route('/signin').post(signIn)

router.route('/signout').post(signOut)

router.route('/me').get(getMe)

export default router