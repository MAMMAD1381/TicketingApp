const {validationResult} = require('express-validator')


exports.signUp = function(req, res, next){
  const errors = validationResult(req)
  if(errors) return res.status(400).send({success:false, errors})
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