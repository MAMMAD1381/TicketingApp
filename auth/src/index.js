const express = require('express')
const {json} = require('body-parser')
const port = 4000
const router = require('./router')

const app = express()
app.use(json())

app.use('/api/users/auth', router)

app.route('/').get((req, res)=>{
  res.status(200).send("<h1>welcome to auth service</h1>")
})


app.listen(port, () => {
  console.log(`auth service is listening on ports ${port}`)
})