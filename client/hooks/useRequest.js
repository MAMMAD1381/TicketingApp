import { useState } from 'react'
import axios from 'axios'

function useRequest({ url, method, body }) {
  const [errors, setErrors] = useState(null)
  const doRequest = async () => {
    let response
    try {
      response = await axios[method](url, body)
      setErrors(null)
      return response.data
    } catch (err) {
      setErrors(
        <div class="alert alert-danger" role="alert">
          <ul>
            {err.response.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      )
    }
  }
  return {doRequest, errors}
}

export default useRequest
