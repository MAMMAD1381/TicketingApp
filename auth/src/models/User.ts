import { Model, Schema, model } from 'mongoose'
import mongoose from 'mongoose'
import Password from '../utilities/password'
import jwt from 'jsonwebtoken'
import { transform } from 'typescript'

interface IUser {
  email: string
  password: string
}

//? user schema methods
interface IUserMethods {
  getJwt(): string
}

//? user schema statics
interface UserModel extends Model<IUser, {}, IUserMethods> {
  // myStaticMethod(): number;
}

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    required: [true, 'pls add an email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
  },
  password: {
    type: String,
    required: [true, 'pls add a password'],
    select: false,
  },
}, {toJSON: {
  transform(doc, ret){
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.password
  }
}})

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await Password.hash(this.password, 8)
  }
  next()
})

UserSchema.method('getJwt', async function () {
  return jwt.sign({ id: this.id, email: this.email }, process.env.JWT_SECRET!)
})

const User = model<IUser, UserModel>('User', UserSchema)

export default User
