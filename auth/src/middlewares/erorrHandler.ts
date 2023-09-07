import { Request, Response, NextFunction } from "express"
import AbstractError from '../errors/AbstractError'
import colors from "colors"

function errorHandler(err: Error, req:Request, res:Response, next:NextFunction){
  if(err instanceof AbstractError){
    console.log(colors.red(`${err.stack}`))
    res.status(err.statusCode).send({success: false, errors: err.customizedResponse()})
  }
}

export default errorHandler