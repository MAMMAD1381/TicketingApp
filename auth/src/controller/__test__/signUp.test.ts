import request from 'supertest'
import app from '../../app'

it('201 on sucessfull signup', async () => {
  request(app)
    .post('/api/users/auth/signup')
    .send({
      email: 'mohammad@gmail.com',
      password: '123456',
    })
    .expect(201)
})
