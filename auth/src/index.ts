import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/configs/config.env' });
import express  from "express"
import { json } from "body-parser"
import color from 'colors'
import router from './router'
import errorHandler from './middlewares/erorrHandler'
import RouteNotFoundError from './errors/RouteNotFoundError'
import connectDB from "./utilities/connectDB"
import cookieParser from "cookie-parser";

const port = 4000

const app = express()
app.use(json())
app.set('trust proxy', true)
app.use(cookieParser())

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