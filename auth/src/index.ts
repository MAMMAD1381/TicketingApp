import app from './app'
import connectDB from './utilities/connectDB'


const port = process.env.PORT

connectDB()
app.listen(port, () => {
  console.log(`auth service is listening on ports ${port}`)
})
