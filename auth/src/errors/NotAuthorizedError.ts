import AbstractError from "./AbstractError";

class NotAuthorizedError  extends AbstractError{
  statusCode = 401;
  reason: string
  constructor(reason?:string){
    super('user not authorized')
    reason? this.reason = reason : this.reason = ''
  }

  customizedResponse(){
    return [{message: `user not authorized ${this.reason}`}]
  }
}

export default NotAuthorizedError