import bcrypt from 'bcrypt'

class Password{
  //? generates a hashed password
  static async hash(password:string, saltRounds:number) {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  }

  //? compares a plaintext password with a hashed version
  static async compare(password:string, hash:string){
    return await bcrypt.compare(password, hash)
  }
}

export default Password