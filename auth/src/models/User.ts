import mongoose from 'mongoose'
import Password from '../utilities/password';

const UserSchema = new mongoose.Schema({
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
})

UserSchema.pre('save', async function(next) {
  if(this.isModified('password')){
    this.password = await Password.hash(this.password, 8)
  }
  next();
});

const User = mongoose.model('User', UserSchema)

export default User
