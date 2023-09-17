import { Request, Response} from "express"

interface RequestCustom extends Request{
  user?: any
}

interface ResponseCustom extends Response{
  user?: any
}


export {RequestCustom, ResponseCustom}