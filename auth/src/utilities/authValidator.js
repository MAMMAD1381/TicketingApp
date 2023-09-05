const { body } = require('express-validator')

exports.authValidation = [
    body('email').isEmail().withMessage('pls enter a valid email: example@example.example'),
    body('password').trim().isLength({ min: 4, max: 8 }).withMessage('pls enter a valid password'),
]
