import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faArrowLeft, faCog } from '@fortawesome/free-solid-svg-icons'
import { updateItSafely } from '../../../lib/http'
import { alertSelectFile, alertMessage } from '../../../lib/alerts'
import { FormattedMessage } from 'react-intl'
import { routes } from '../../../router/dashboard.routes'
import { settingContext } from '../../../contexts/settingContext'
import './styles.css'

const Sidebar  = () => {
    const history = useHistory()
    const setting = useContext(settingContext)
    const [user, setUser] = useState(null)
    
    const handleGetUser = () => {
        const dataUser = JSON.parse(localStorage.getItem('user'))
        setUser(dataUser)
    }
    
    const handleSelectImg = async () => {
        const img = await alertSelectFile('Select Img', 'Upload Profile Picture', 'image/.x,.jpeg,.jpg,.png,.ico')
        if(img !== null) {
            const formData = new FormData()
            formData.append('profilePicture', img)
            try {
                const res = await updateItSafely(`dashboard/updatePhoto/${user.id}`, formData)
                if(res.server === 'profilePictureUpdate'){
                    const dataUser = JSON.parse(localStorage.getItem('user'))
                    dataUser.profilePicture = res.url
                    localStorage.removeItem('user')
                    localStorage.setItem('user', JSON.stringify(dataUser))
                    handleGetUser()
                    alertMessage('Update Profile Picture', 'The profile picture has been updated correctly.', 'success')
                } else if(res.server === 'profilePictureNotUpdate') alertMessage('Update Profile Picture', 'Could not update profile picture please try again later.', 'error')
                else if(res.server === 'profilePictureNotValid') alertMessage('Profile Picture Invalid', 'Image extension is not valid please use images in .jpg, .jpeg, .png, .ico format.', 'error')
                else if(res.server === 'SessionExpired') {
                    const confirm = await alertMessage('Session expired', 'Your session has expired, please log in again.', 'warning')
                    if(confirm.isConfirmed) {
                        setting.logOut(() => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('user')
                            history.push('/auth')
                        })
                    }
                }   
            }catch(e) {
                alertMessage('No Internet connection', 'No internet connection please check your internet.', 'error')
            }
        }
    }
    
    useEffect(() => {
        handleGetUser()
    }, [])
    return (
        <>
            <div className="menu">
                <div className="menu-header">
                    <div className="d-flex justify-content-end pt-2">
                        <Link to="/workAreas/office">
                            <FontAwesomeIcon icon={faArrowLeft} className="btn-menu" />
                        </Link>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div>
                            {user !== null && user.profilePicture === 'icon' 
                                ? <FontAwesomeIcon icon={faUserCircle} className="icon-user" onClick={handleSelectImg} />
                                : <img src={user !== null && user.profilePicture !== 'icon' ? user.profilePicture : "#"} alt="User Img" onClick={handleSelectImg} className="img-user" />
                            }
                        </div>
                        <div>
                            <span className="name-user">{ user !== null ? user.name.substr(0, 15) : 'User Name' }</span>
                        </div>
                    </div>
                </div>
                <div className="menu-body">
                    <ul className="menu-nav">
                        { 
                            routes.filter(r => r.roles.indexOf(JSON.parse(localStorage.getItem('user')).role) > -1 && JSON.parse(localStorage.getItem('user')).workArea.indexOf(r.workArea) > -1).map((route, i) => (
                                <li className="menu-item"  key={i}>
                                    <Link to={route.dashboardPath} className="menu-item__link">
                                        <div className="d-flex ps-2">
                                            <div>
                                                <FontAwesomeIcon icon={route.icon} className="me-2" />
                                            </div>
                                            <div>
                                                <span>{<FormattedMessage id={`workAreas.${route.titles[0].toLowerCase()}`} defaultMessage={route.titles[0]} />}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="menu-footer">
                    <div className="btn-group dropup">
                        <button className="border-0 bg-transparent text-white dropdown-toggle" type="button" id="settings" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={faCog} className="btn-menu mt-1" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="settings">
                            
                            <li>
                                <span className="dropdown-item-text">
                                    <FormattedMessage id="app.lang" defaultMessage="Language" />
                                </span>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <span className="dropdown-item cursor-pointer" onClick={() => setting.setLang('en-Us')}>
                                    <FormattedMessage id="app.langEnglish" defaultMessage="English" />
                                </span>
                            </li>
                            <li>
                                <span className="dropdown-item cursor-pointer" onClick={() => setting.setLang('es-Mx')}>
                                    <FormattedMessage id="app.langSpanish" defaultMessage="Spanish" />
                                </span>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <span className="dropdown-item">
                                    <Link className="text-white text-decoration-none" to="#" onClick={() => {
                                        setting.logOut(() => {
                                                localStorage.removeItem('token')
                                                localStorage.removeItem('user')
                                                history.push('/')
                                            })
                                        }}>
                                            <FormattedMessage id="header.logOut" defaultMessage="Log Out" />
                                    </Link>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Sidebar