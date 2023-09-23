import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/useRequest'

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({url: '/api/auth/signup', method: 'post', body:{
    email, password
  }})

  async function submitForm(event) {
    event.preventDefault()
    const res = await doRequest()
    if(res) Router.push('/')
    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={submitForm}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {errors}
    </form>
  )
}
