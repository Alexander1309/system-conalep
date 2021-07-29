import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faCog, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { updateItSafely } from '../../lib/http'
import { alertSelectFile, alertMessage } from '../../lib/alerts'
import './styles.css'

const Sidebar  = () => {
    const [user, setUser] = useState(null)
    
    const handleGetUser = () => {
        const dataUser = JSON.parse(localStorage.getItem('user'))
        setUser(dataUser)
    }
    
    const handleSelectImg = async () => {
        const img = await alertSelectFile('Select Img', 'image/.jpeg,.jpg,.png,.ico')
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
                } else if(res.server === 'profilePictureNotUpdate') {
                    alertMessage('Update Profile Picture', 'Could not update profile picture please try again later.', 'error')
                } else if(res.server === 'profilePictureNotValid') {
                    alertMessage('Profile Picture Invalid', 'Image extension is not valid please use images in .jpg, .jpeg, .png, .ico format.', 'error')
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
                        <FontAwesomeIcon icon={faCog} className="btn-menu" />
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
                        <li className="menu-item">
                            <Link to="/dashboard" className="menu-item__link">
                                <div className="d-flex ps-2">
                                    <div>
                                        <FontAwesomeIcon icon={faHome} className="me-2" />
                                    </div>
                                    <div>
                                        <span>Home</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/dashboard/users" className="menu-item__link">
                                <div className="d-flex ps-2">
                                    <div>
                                        <FontAwesomeIcon icon={faUser} className="menu-item__icon me-2" />
                                    </div>
                                    <div>
                                        <span>Users</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar