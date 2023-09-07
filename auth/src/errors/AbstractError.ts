abstract class AbstractError extends Error{
  abstract statusCode: number
  constructor(){
    super()

    
  }
  abstract customizedResponse(): {message:string, field?:string}[]
}

export default AbstractError