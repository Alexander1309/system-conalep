import { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import auth from '../../lib/auth'
import './styles.css'
import Logo from '../../img/logo-v.svg'

const App = ({ history }) => {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if(auth.isAuth()) setHidden(false)
    document.title = "Conalep - Welcome"
  }, [])

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center pt-2">
          <div>
            <img src={Logo} alt="Logo conalep" className="d-inline-block align-text-top" />
          </div>
          <div>
            <div className="ms-auto">
              { hidden 
                ? <Link className="btn btn-signUp" to="/auth">Sign Up</Link>
                : <Link className="btn btn-signUp" to="/Home">Home</Link>
              }
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <h1 className="title">Welcome to the conalep system</h1>
        </div>
      </div>
    </>
  )
}

export default withRouter(App)