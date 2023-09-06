function errorHandler(err, req, res, next){
  console.log(`${err.errors}\n${err.stack}`)
  res.status(err.statusCode).send({success: false, errors: err.errors})
}

module.exports = errorHandler