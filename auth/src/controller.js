const {validationResult} = require('express-validator')
const BasicError = require('./errors/BasicError')
const DatabaseConnectionError = require('./errors/DatabaseConnectionError')
const RequestValidationError = require('./errors/RequestValidationError')


exports.signUp = function(req, res, next){
  const errors = validationResult(req)
  if(!errors.isEmpty()) throw new RequestValidationError(Object.values(errors.errors))
  throw new BasicError()
  res.status(201).send({success: true})
}

exports.signIn = function(req, res, next){

  res.status(201).send({success: true})
}

exports.signOut = function(req, res, next){

  res.status(201).send({success: true})
}

exports.getMe = function(req, res, next){

  res.status(201).send({success: true})
}