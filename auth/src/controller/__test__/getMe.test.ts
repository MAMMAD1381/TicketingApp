import request from 'supertest'
import app from '../../app'

const signUpURI = '/api/users/auth/signup'
const getMeURI = '/api/users/auth/me'

//? get back the relevant user
it('relevant user from response of getme route', async () => {
  const authResponse = await request(app).post(signUpURI).send({
    email: 'mohammad@gmail.com',
    password: '123456',
  })

  let cookies = authResponse.headers['set-cookie']
  let token = authResponse.body.token

  const res = await request(app)
    .get(getMeURI)
    .set('Cookie', cookies)
    .set('Authorization', `Bearer ${token}`)
    .send({})

  expect(res.statusCode).toBe(200)
  expect(res.body.email).toBe(authResponse.body.email)
  expect(res.body.id).toBe(authResponse.body.id)
})

//? successful request to route with jwt cookie
it('using only jwt cookie for /me route', async () => {
  const authResponse = await request(app).post(signUpURI).send({
    email: 'mohammad@gmail.com',
    password: '123456',
  })

  let cookies = authResponse.headers['set-cookie']

  const res = await request(app).get(getMeURI).set('Cookie', cookies).send({})
  expect(res.statusCode).toBe(200)
  expect(res.body.email).toBe(authResponse.body.email)
  expect(res.body.id).toBe(authResponse.body.id)
})

//? successful request to route with Authorization header
it('using only bearer token on /me route', async () => {
  const authResponse = await request(app).post(signUpURI).send({
    email: 'mohammad@gmail.com',
    password: '123456',
  })

  let token = authResponse.body.token

  const res = await request(app).get(getMeURI).set('Authorization', `Bearer ${token}`).send({})
  expect(res.statusCode).toBe(200)
  expect(res.body.email).toBe(authResponse.body.email)
  expect(res.body.id).toBe(authResponse.body.id)
})

//? not providing cookie or bearer token
it('using neither bearer token, nor jwt cookie', async () => {
  const res = await request(app).get(getMeURI).send({})
  expect(res.statusCode).toBe(401)
  expect(res.body.errors).toBeDefined()
})

//? providing a wrong cookie or token or modified version of them
it('using wrong bearer token or wrong cookie', async () => {
  const authResponse = await request(app).post(signUpURI).send({
    email: 'mohammad@gmail.com',
    password: '123456',
  })

  let token = authResponse.body.token
  let modifiedToken = token + 'bullshit'
  let cookies = authResponse.headers['set-cookie']
  let modifiedCookie = [...cookies]
  modifiedCookie[0] =
    cookies[0].slice(0, cookies[0].indexOf('=') + 1) +
    modifiedToken +
    cookies[0].slice(cookies[0].indexOf(';'))

  const res = await request(app)
    .get(getMeURI)
    .set('Cookie', modifiedCookie)
    .set('Authorization', `Bearer ${modifiedToken}`)
    .send({})
  expect(res.statusCode).toBe(401)
  expect(res.body.errors).toBeDefined()
})

//? providing a wrong cookie but a right token
it('using wrong cookie and a right token', async () => {
  const authResponse = await request(app).post(signUpURI).send({
    email: 'mohammad@gmail.com',
    password: '123456',
  })

  let token = authResponse.body.token
  let modifiedToken = token + 'bullshit'
  let cookies = authResponse.headers['set-cookie']
  let modifiedCookie = [...cookies]
  modifiedCookie[0] =
    cookies[0].slice(0, cookies[0].indexOf('=') + 1) +
    modifiedToken +
    cookies[0].slice(cookies[0].indexOf(';'))

  const res = await request(app)
    .get(getMeURI)
    .set('Cookie', modifiedCookie)
    .set('Authorization', `Bearer ${token}`)
    .send({})
  expect(res.statusCode).toBe(200)
  expect(res.body.email).toBe(authResponse.body.email)
  expect(res.body.id).toBe(authResponse.body.id)
})

//? providing a wrong token but a right cookie
it('using wrong token and a right cookie', async () => {
  const authResponse = await request(app).post(signUpURI).send({
    email: 'mohammad@gmail.com',
    password: '123456',
  })

  let token = authResponse.body.token
  let modifiedToken = token + 'bullshit'
  let cookies = authResponse.headers['set-cookie']
  let modifiedCookie = [...cookies]
  modifiedCookie[0] =
    cookies[0].slice(0, cookies[0].indexOf('=') + 1) +
    modifiedToken +
    cookies[0].slice(cookies[0].indexOf(';'))

  const res = await request(app)
    .get(getMeURI)
    .set('Cookie', cookies)
    .set('Authorization', `Bearer ${modifiedToken}`)
    .send({})
  expect(res.statusCode).toBe(200)
  expect(res.body.email).toBe(authResponse.body.email)
  expect(res.body.id).toBe(authResponse.body.id)
})
