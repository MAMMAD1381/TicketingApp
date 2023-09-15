import { Request } from "express"
interface RequestCustom extends Request{
  user?: any
}

export default RequestCustom