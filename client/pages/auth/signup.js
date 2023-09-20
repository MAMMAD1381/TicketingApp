import { useState } from 'react'
import axios from 'axios'

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submitForm(event){
    event.preventDefault()
    const response = await axios.post('api/users/auth/signup', {email, password})

    console.log(response.data)
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
          onChange={e=>setEmail(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}
