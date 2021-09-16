import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { alertMessage } from '../../lib/alerts'
import { settingContext } from '../../contexts/settingContext'
import { post } from '../../lib/http'
import { getUrlValue } from '../../lib/functions'
import { validateEmails, validatePasswords } from '../../lib/validations'
import { FormattedMessage } from 'react-intl'
import './styles.css'
import Logo from '../../img/logo-v.svg'

import SignIn from './SignIn'
import SignUp from './SignUp'

const Auth = () => {
    const history = useHistory()
    const setting = useContext(settingContext)
    const [hidden, setHidden] = useState(true)
    const [submit, setSubmit] = useState(false)
    const [signIn, setSignIn] = useState({ email: '', password: '' })
    const [signUp, setSignUp] = useState({ name: '', lastName: '', email: '', password: '', accessCode: '' })

    const handleHidden = () => {
        setSignIn({ email: '', password: '' })
        setSignUp({ name: '', email: '', password: '', accessCode: '' })
        setHidden(!hidden)
    }

    const handleSubmitSignIn = async (e) => {
        e.preventDefault()
        if(signIn.email === '' || signIn.password === '') alertMessage('Empty fields', 'All fields are mandatory.', 'warning')
        else {
            setSubmit(true)
            try {
                const res = await post('auth/signIn', signIn)
                if(res.server === 'UserNotExist') {
                    alertMessage('Incorrect data', 'The username and/or password are incorrect, please check that your details are correct.', 'error')
                    setSubmit(false)
                } else if(res.server === 'UserExist') {
                    setSubmit(false)
                    const confirm = await (await alertMessage('User login', 'You are successfully logged in.', 'success')).isConfirmed
                    if(confirm) {
                        localStorage.setItem('token', res.token)
                        localStorage.setItem('user', JSON.stringify(res.dataUser))
                        setting.signIn(() => history.push('/workAreas/office'))
                    }
                } else if(res.server === 'BlockedUser') {
                    alertMessage('Blocked user', 'The user is temporarily blocked. If you think this is an error, please contact the administrator.', 'info')
                    setSubmit(false)
                }
            } catch(e) {
                setSubmit(false)
                alertMessage('No Internet connection', 'No internet connection please check your internet.', 'error') 
            }
        }
    }
    
    const handleSubmitSignUp = async (e) => {
        e.preventDefault()
        if(signUp.name === '' || signUp.lastName === '' || signUp.email === '' || signUp.password === '' || signUp.accessCode === '') alertMessage('Empty fields', 'All fields are mandatory.', 'warning')
        else if(!validateEmails.test(signUp.email)) alertMessage('Invalid mail', 'The email is not valid, it must be an institutional email.', 'error')
        else if(!validatePasswords.test(signUp.password)) alertMessage('Invalid password', 'The password must contain 8 or 16 digits and must contain upper and lower case letters.', 'error')
        else {
            setSubmit(true)
           try {
                const res = await (await post('auth/signUp', signUp)).server
                if (res === 'InvalidCode') {
                    alertMessage('Invalid access code', 'The access code is invalid please check that the code is valid.', 'error')
                    setSubmit(false)
                } else if(res === 'UserNotCreated') {
                    alertMessage('Unregistered user', 'The user could not be registered please try again later.', 'error')
                    setSubmit(false)
                }else if(res === 'EmailExist') {
                    alertMessage('Email Exist', 'The email already exists, please try another one.', 'error')
                    setSubmit(false)
                } else if(res === 'UserCreated') {
                    setSubmit(false)
                    const confirm = await (await alertMessage('Registered user', 'The user has been successfully registered.', 'success')).isConfirmed
                    if(confirm) {
                        setSubmit(false)
                        setHidden(false)
                    }
                } 
            } catch(e) {
                setSubmit(false)
                alertMessage('No Internet connection', 'No internet connection please check your internet.', 'error')
           }
        }
    }

    useEffect(() => {
        if(setting.isAuth) history.push('/workAreas/office')
        if(hidden) document.title = "Conalep - Sign Up"
        else document.title = "Conalep - Sign In"
        const accessCode = getUrlValue('accessCode')
        setSignUp({ name: '', email: '', password: '', accessCode})
    }, [setting, history, hidden])

    return (
        <>
            <div className="content">
                <img src={Logo} alt="Logo conalep" className="logo" />
            </div>
            <div className="container">
                <form className="form" onSubmit={hidden === false ? handleSubmitSignIn : handleSubmitSignUp}>
                    <div className="wrap">
                        <div className="form-header">
                            <h1 className="title">{ hidden === false 
                                ? <FormattedMessage id="auth.signIn" defaultMessage="Sign In" />
                                : <FormattedMessage id="auth.signUp" defaultMessage="Sign Up" /> }</h1>
                        </div>
                        <div className="form-body pt-2">
                            { hidden === false 
                                ? 
                                    <SignIn state={signIn} setState={setSignIn} /> 
                                : 
                                    <SignUp state={signUp} setState={setSignUp} /> 
                            }
                            <div className="mb-3 mt-4 d-grid gap-2">
                                { submit === false 
                                    ?
                                        <button className="btn btn-color" type="submit">{ hidden === false 
                                            ? <FormattedMessage id="auth.signIn" defaultMessage="Sign In" /> 
                                            : <FormattedMessage id="auth.signUp" defaultMessage="Sign Up" /> }</button>
                                    :
                                        <button className="btn btn-color" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span className="ps-2">
                                                <FormattedMessage id="auth.btn" defaultMessage="Verifying data..." />    
                                            </span>
                                        </button>
                                }
                            </div>
                            <p className="mb-3 mr-2 not-s">{ hidden === false 
                                ? <FormattedMessage id="auth.msg1" defaultMessage="Not registered yet?" />
                                : <FormattedMessage id="auth.msg2" defaultMessage="Already have an account?" />
                            }
                                <span className="btn-active ps-1" onClick={handleHidden}>{ hidden === false 
                                ? <FormattedMessage id="auth.signUp" defaultMessage="Sign Up" /> 
                                : <FormattedMessage id="auth.signIn" defaultMessage="Sign Ip" /> }</span>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Auth