import  Express  from "express";
import { json } from "body-parser";
const port = 4000

const app = Express()
app.use(json())
app.route('/auth').get((req, res)=>{
  res.status(200).send("<h1>welcome to auth service</h1>")
})


app.listen(port, () => {
  console.log(`auth service is listening on ports ${port}`)
})