import { createContext, useState } from 'react'
import { IntlProvider } from 'react-intl'
import en from '../lang/en.json'
import es from '../lang/es.json'

const settingContext = createContext()

const SettingProvider = ({children}) => {
    let defaultLocale, defaultMessage, defaultAuth
    const auth = localStorage.getItem('isAuth')
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    const lang = localStorage.getItem('lang')
    
    if(auth && token && user) defaultAuth = true
    else {
        localStorage.setItem('isAuth', false)
        defaultAuth = false
    }

    if(lang) {
        defaultLocale = lang
        if (lang === 'en-Us') defaultMessage = en
        else if(lang === 'es-Mx') defaultMessage = es
        else defaultMessage = en
    }
    
    const [isAuth, setIsAuth] = useState(defaultAuth)
    const [message, setMessage] = useState(defaultMessage)
    const [locale, setLocale] = useState(defaultLocale)
    
    
    const signIn = cb => {
        setIsAuth(true)
        localStorage.setItem('isAuth', true)
        setTimeout(cb, 100)
    }
    
    const logOut = cb => {
        setIsAuth(false)
        localStorage.setItem('isAuth', false)
        setTimeout(cb, 100)
    }

    const setLang = lang => {
        switch(lang) {
            case 'en-Us':
                setLocale('en-Us')
                setMessage(en)
                localStorage.setItem('lang', 'en-Us')
            break
            
            case 'es-Mx':
                setLocale('es-Mx')
                setMessage(es)
                localStorage.setItem('lang', 'es-Mx')
            break

            default: 
                setLocale('en-Us')
                setMessage(en)
                localStorage.setItem('lang', 'en-Us')
        }
    }
    return (
        <settingContext.Provider value={{isAuth, signIn, logOut, setLang}}>
            <IntlProvider locale={locale} messages={message}>
                {children}
            </IntlProvider>
        </settingContext.Provider> 
    )
}

export { SettingProvider, settingContext }