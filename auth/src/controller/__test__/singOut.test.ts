import request from 'supertest'
import app from '../../app'

const signUpURI = '/api/users/auth/signup'
const signOutURI = '/api/users/auth/signout'

//? successful signup and signout
it('sucessful signup', async () => {
  await request(app).post(signUpURI).send({
    email: 'mohammad@gmail.com',
    password: '123456',
  })

  const res = await request(app).post(signOutURI).send({})
  expect(res.statusCode).toEqual(200)
  expect(res.body.success).toBe(true)
  expect(res.body.user).toBe(null)
})
