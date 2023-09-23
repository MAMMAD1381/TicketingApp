import axios from 'axios'

const mainPage = ({ user }) => {
  console.log(user)
  return <h1>welcome home {user.email}</h1>
}

mainPage.getInitialProps = async ({ req }) => {
  if(req){
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/auth/me',
      { headers: req.headers }
    )
    return data
  }
  else {
    const { data } = await axios.get(
      '/api/auth/me'
    )
    return data
  }
}

export default mainPage
