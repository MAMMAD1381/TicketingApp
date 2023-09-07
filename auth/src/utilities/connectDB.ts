import mongoose from "mongoose";
import colors from 'colors'
const DB_URL = 'mongodb://auth-mongo-srv:27017'


async function connectDB(){
  console.log('db connection')
  try{
    const db = await mongoose.connect(DB_URL)
    console.log(colors.green(`success connecting to db\n${db}` ))
  }
  catch(err: any){
    console.log(colors.red(`database connection error:\n${err.stack}`))
  }
}

export default connectDB