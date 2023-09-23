import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/configs/config.env' })
import express from 'express'
import { json } from 'body-parser'
import router from './routes/router'
import errorHandler from './middlewares/erorrHandler'
import RouteNotFoundError from './errors/RouteNotFoundError'
import cookieParser from 'cookie-parser'

const app = express()
app.use(json())
app.set('trust proxy', true)
app.use(cookieParser())

app.use('/api/auth', router)

app.route('/').get((req, res) => {
  res.status(200).send('<h1>welcome to auth service</h1>')
})

app.route('*').all((req, res, next) => {
  next(new RouteNotFoundError(req.originalUrl))
})

app.use(errorHandler)

export default app