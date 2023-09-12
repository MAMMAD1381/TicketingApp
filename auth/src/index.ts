import express  from "express"
import { json } from "body-parser"
import router from './router'
import errorHandler from './middlewares/erorrHandler'
import RouteNotFoundError from './errors/RouteNotFoundError'
import connectDB from "./utilities/connectDB"
import cookieSession from "cookie-session"

const port = 4000

const app = express()
app.use(json())
app.set('trust proxy', true)
app.use(cookieSession({
  signed: false,
  secure: true
}))

app.use('/api/users/auth', router)

app.route('/').get((req, res)=>{
  res.status(200).send("<h1>welcome to auth service</h1>")
})

app.route('*').all((req, res, next) => {
  next(new RouteNotFoundError(req.originalUrl))
})

app.use(errorHandler)

databaseConfigurations()

app.listen(port, () => {
  console.log(`auth service is listening on ports ${port}`)
})

function databaseConfigurations(){
  connectDB()



}