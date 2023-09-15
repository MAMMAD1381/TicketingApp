import AbstractError from "./AbstractError";

class AuthorizationProcessError extends AbstractError{
  statusCode=400;
  customMessage=`an error during authorization process`;
  reason

  constructor(reason: string){
    super(`an error during authorization process: ${reason}`)
    this.reason = reason
  }

  customizedResponse() {
      return [{message: this.customMessage}]
  }
}

export default AuthorizationProcessError