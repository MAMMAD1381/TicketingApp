import request from 'supertest'
import app from '../../app'

const signUpURI = '/api/users/auth/signup'
const signInURI = '/api/users/auth/signin'

//? successful signin after signup
it('successful signin', async () => {
  let res

  //? signup
  await request(app).post(signUpURI).send({ email: 'mohammad@gmail.com', password: '123456' })

  //? signin with the same credentials
  res = await request(app).post(signInURI).send({ email: 'mohammad@gmail.com', password: '123456' })

  expect(res.statusCode).toBe(200)
  expect(res.body.success).toBe(true)
  expect(res.body.token).toBeDefined() //? receiving a token in response
  expect(res.headers['set-cookie'].length).toEqual(1) //? receiving 1 cookie
  expect(res.headers['set-cookie'][0]).toMatch('JWT_TOKEN') //? the cookie should contain a JWT_TOKEN
  expect(res.headers['set-cookie'][0]).toContain(res.body.token) //? received token in response should mathc the JWT_TOKEN in cookies
})

//? wrong credentials
it('wrong credetials', async () => {
  let res

  //? signup
  await request(app).post(signUpURI).send({ email: 'mohammad@gmail.com', password: '123456' })

  //? email doesn't exists
  res = await request(app).post(signInURI).send({ email: 'mmmmmmmmm@gmail.com', password: '123456' })

  expect(res.statusCode).toBe(404)
  expect(res.body.success).toBe(false)

  //? signin with the wrong password but right email
  res = await request(app).post(signInURI).send({ email: 'mohammad@gmail.com', password: '' })

  expect(res.statusCode).toBe(400)
  expect(res.body.success).toBe(false)
})
