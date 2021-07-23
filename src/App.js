import { useEffect } from 'react'
import auth from './lib/auth'
import { withRouter, Link } from 'react-router-dom'

const App = ({ history }) => {

  useEffect(() => {
    if(auth.isAuth()) history.push('/home')
  }, [history])

  return (
    <>
      <Link className="btn btn-success" to="/auth/signIn">Sign In</Link>
      <Link className="btn btn-success ms-2" to="/auth/signUp">Sign Up</Link>
    </>
  )
}

export default withRouter(App)