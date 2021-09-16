import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { settingContext } from '../../contexts/settingContext'
import { FormattedMessage } from 'react-intl'
import './styles.css'
import Logo from '../../img/logo-v.svg'

const App = () => {
  const setting = useContext(settingContext)
  const [hidden, setHidden] = useState(!setting.isAuth)

  
  useEffect(() => {
    if(setting.isAuth) setHidden(false)
    document.title = localStorage.getItem('lang') === 'en-Us' ? 'Conalep - Welcome' : 'Conalep - Bienvenidos'
  }, [setting])
  
  
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
                ? <Link className="btn btn-signUp" to="/auth">
                    <FormattedMessage id="app.btn1" defaultMessage="Sign Up" />
                  </Link>
                : <Link className="btn btn-signUp" to="/workAreas/office">
                    <FormattedMessage id="app.btn2" defaultMessage="Home" />
                  </Link>
              }
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <h1 className="title">
              <FormattedMessage id="app.title" defaultMessage="Welcome to the conalep system" />
          </h1>
        </div>
      </div>
    </>
  )
}

export default App