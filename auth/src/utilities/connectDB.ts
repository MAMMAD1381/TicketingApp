import mongoose from "mongoose";
import colors from 'colors'
const DB_URL = process.env.NODE_ENV==='development' ? 'mongodb://127.0.0.1:27017/auth' : 'mongodb://auth-mongo-srv:27017'

async function connectDB(){
  console.log('db connection')
  try{
    const db = await mongoose.connect(DB_URL)
    console.log(colors.green(`success connecting to db` ))
  }
  catch(err: any){
    console.log(colors.red(`database connection error:\n${err.stack}`))
  }
  console.log('after connection')
}

export default connectDB