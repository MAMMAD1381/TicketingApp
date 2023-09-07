import AbstractError from "./AbstractError";

class RouteNotFoundError extends AbstractError{
  statusCode = 404
  path
  constructor(path: any){
    super(`route ${path} not found`)
    this.path = path
  }
  customizedResponse(){
    return [{message: `route ${this.path} not found`}]
  }
}

export default RouteNotFoundError