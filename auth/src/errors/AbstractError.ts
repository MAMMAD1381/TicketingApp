abstract class AbstractError extends Error{
  abstract statusCode: number
  constructor(message:string){
    super(message)

    
  }
  abstract customizedResponse(): {message:string, field?:string}[]
}

export default AbstractError