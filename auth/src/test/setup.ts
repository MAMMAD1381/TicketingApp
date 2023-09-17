import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import  app  from '../app';

let mongo: any;
let db: any
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

  mongo = new MongoMemoryServer()
  await mongo.start()
  const mongoUri = mongo.getUri();

  db = await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
