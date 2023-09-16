import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import app from '../app'

let mongo: any

async function beforeAll(){
  mongo = new MongoMemoryServer()
  const dbURI = await mongo.geturi()
  const db = await mongoose.connect(dbURI)
}

async function beforeEach(){
  const collections = await mongoose.connection.db.collections()
  for(let collection of collections){
    await collection.deleteMany({})
  }
}

async function afterAll(){
  mongo.stop()
  mongoose.connection.close()
}