import { useState, useEffect } from 'react'

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        if(localStorage.getItem('token') && localStorage.getItem('user')) setIsAuth(true)
        else setIsAuth(false)
    }, [])

    const login = (cb) => {
        setIsAuth(true)
        setTimeout(cb, 100)
    }

    const logOut = (cb) => {
        setIsAuth(false)
        setTimeout(cb, 100)
    }

    return {
        login,
        logOut,
        isAuth,
    }
}