import request from 'supertest'
import app from '../../app'

const signUpURI = '/api/users/auth/signup'

//? successful signup
it('sucessful signup', async () => {
  const res = await request(app).post(signUpURI).send({
    email: 'mohammad@gmail.com',
    password: '123456',
  })

  expect(res.statusCode).toEqual(201)
  expect(res.body.success).toBe(true)
  expect(res.body.token).toBeDefined() //? receiving a token in response
  expect(res.headers['set-cookie'].length).toEqual(1) //? receiving 1 cookie
  expect(res.headers['set-cookie'][0]).toMatch('JWT_TOKEN') //? the cookie should contain a JWT_TOKEN
  expect(res.headers['set-cookie'][0]).toContain(res.body.token) //? received token in response should mathc the JWT_TOKEN in cookies
})

//? duplicate email for signup
it('signup with same email', async () => {
  await request(app).post(signUpURI).send({
    email: 'mohammad@gmail.com',
    password: '123456',
  })

  const res = await request(app).post('/api/users/auth/signup').send({
    email: 'mohammad@gmail.com',
    password: '123456',
  })

  expect(res.statusCode).toEqual(400)
  expect(res.body.success).toBe(false)
  expect(res.body.errors).toBeDefined()
})

//? no email and password
it('not providing email or password', async () => {
  let res

  //? no email and no pass
  res = await request(app).post(signUpURI).send({
    email: '',
    password: '',
  })

  expect(res.statusCode).toBe(400)
  expect(res.body.success).toBe(false)
  expect(res.body.errors).toBeDefined()

  //? no email
  res = await request(app).post(signUpURI).send({
    email: '',
    password: '123456',
  })

  expect(res.statusCode).toBe(400)
  expect(res.body.success).toBe(false)
  expect(res.body.errors).toBeDefined()

  //? no pass
  res = await request(app).post(signUpURI).send({
    email: 'mohammad@gmail.com',
    password: '',
  })

  expect(res.statusCode).toBe(400)
  expect(res.body.success).toBe(false)
  expect(res.body.errors).toBeDefined()
})

//? wrong format for email and pass
it('wrong email and pass', async () => {
  let res

  res = await request(app).post(signUpURI).send({
    email: 'sdfsdfsf',
    password: ' dsfsdf 323@',
  })

  expect(res.statusCode).toBe(400)
  expect(res.body.success).toBe(false)
  expect(res.body.errors).toBeDefined()
})
