const express = require('express')
const router = express.Router()
const {signUp, signIn, signOut, getMe} = require('./controller')

router.route('/signup').post(signUp)

router.route('/signin').post(signIn)

router.route('/signout').post(signOut)

router.route('/me').get(getMe)

module.exports = router