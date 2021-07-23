import { useState, useEffect } from 'react'
import { withRouter, useParams } from 'react-router-dom'
import { alertMessage } from '../../lib/alerts'
import auth from '../../lib/auth'
import { post } from '../../lib/http'
import { validateEmails, validatePasswords } from '../../lib/validations'
import './styles.css'
import Logo from '../../img/logo-v.svg'

import SignIn from './SignIn'
import SignUp from './SignUp'

const Auth = ({ history }) => {
    const { id } = useParams()
    const [hidden, setHidden] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [signIn, setSignIn] = useState({ email: '', password: '' })
    const [signUp, setSignUp] = useState({ name: '', email: '', password: '', accessCode: '' })

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
                    auth.signIn(() => history.push('/home'))
                }
            }
        }
    }
    
    const handleSubmitSignUp = async (e) => {
        e.preventDefault()
        if(signUp.name === '' || signUp.email === '' || signUp.password === '' || signUp.accessCode === '') alertMessage('Empty fields', 'All fields are mandatory.', 'warning')
        else if(!validateEmails.test(signUp.email)) alertMessage('Invalid mail', 'The email is not valid, it must be an institutional email.', 'error')
        else if(!validatePasswords.test(signUp.password)) alertMessage('Invalid password', 'The password must contain 8 or 16 digits and must contain upper and lower case letters.', 'error')
        else {
            setSubmit(true)
            const res = await (await post('auth/signUp', signUp)).server
            if (res === 'InvalidCode') {
                alertMessage('Invalid access code', 'The access code is invalid please check that the code is valid.', 'error')
                setSubmit(false)
            } else if(res === 'UserNotCreated') {
                alertMessage('Unregistered user', 'The user could not be registered please try again later.', 'error')
                setSubmit(false)
            } else if(res === 'UserCreated') {
                setSubmit(false)
                const confirm = await (await alertMessage('Registered user', 'The user has been successfully registered.', 'success')).isConfirmed
                if(confirm) {
                    setSubmit(false)
                    setHidden(false)
                }
            }
        }
    }

    useEffect(() => {
        if(auth.isAuth()) history.push('/home')
        if(id === 'signIn') setHidden(false)
        else if(id === 'signUp') setHidden(true)
    }, [id, history])

    return (
        <>
            <div className="content">
                <img src={Logo} alt="Logo conalep" className="logo" />
            </div>
            <div className="container">
                <form className="form" onSubmit={hidden === false ? handleSubmitSignIn : handleSubmitSignUp}>
                    <div className="wrap">
                        <div className="form-header">
                            <h1 className="title">{ hidden === false ? 'Sign In' : 'Sign Up' }</h1>
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
                                        <button className="btn btn-color" type="submit">{ hidden === false ? 'Sign In' : 'Sign Up' }</button>
                                    :
                                        <button className="btn btn-color" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span className="ps-2">Verifying data...</span>
                                        </button>
                                }
                            </div>
                            <p className="mb-3 mr-2 not-s">{ hidden === false ? 'Not registered yet?' : 'Already have an account? ' }
                                <span className="btn-active ps-1" onClick={handleHidden}>{ hidden === false ? 'Sign Up' : 'Sign In' }</span>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default withRouter(Auth)