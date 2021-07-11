import { useState } from 'react'
import './styles.css'
import Logo from '../../img/logo-v.svg'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Auth = () => {
    const [auth, setAuth] = useState(false)

    const handleHidden = () => {
        setAuth(!auth)
    }

    return (
        <>
            <div className="content">
                <img src={Logo} alt="Logo conalep" className="logo" />
            </div>
            <div className="container">
                <form className="form-login">
                    <div className="wrap">
                        <div className="form-header">
                            <h1 className="title">{ auth === false ? 'Sign In' : 'Sign Up' }</h1>
                        </div>
                        <div className="form-body pt-2">
                            { auth === false ? <SignIn /> : <SignUp /> }
                            <div className="mb-3 mt-4 d-grid gap-2">
                                <button className="btn btn-color" type="button">{ auth === false ? 'Sign In' : 'Sign Up' }</button>
                            </div>
                            <p className="mb-3 mr-2 not-s">{ auth === false ? 'Not registered yet?' : 'Already have an account? ' }<span className="btn-active ps-1" onClick={handleHidden}>{ auth === false ? 'Sign Up' : 'Sign In' }</span></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Auth