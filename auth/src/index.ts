import express  from "express"
import { json } from "body-parser"
import router from './router'
import errorHandler from './middlewares/erorrHandler'

const port = 4000

const app = express()
app.use(json())

app.use('/api/users/auth', router)

app.route('/').get((req, res)=>{
  res.status(200).send("<h1>welcome to auth service</h1>")
})

app.use(errorHandler)


app.listen(port, () => {
  console.log(`auth service is listening on ports ${port}`)
})