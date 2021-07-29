import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faCog } from '@fortawesome/free-solid-svg-icons'
import { updateItSafely } from '../../lib/http'
import { alertSelectFile, alertMessage } from '../../lib/alerts'
import './styles.css'

const Dashboard = () => {
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
        }
    }
    
    
    useEffect(() => {
        document.title = "Conalep - Dashboard"
        handleGetUser()
    }, [])

    return (
        <>
            <div className="container-fluid">
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
                </div>
            </div>
        </>
    )
}

export default Dashboard