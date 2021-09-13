import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import auth from '../../../lib/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCrown, faUserLock, faCopy } from '@fortawesome/free-solid-svg-icons'
import { alertMessage, alertConfirm } from '../../../lib/alerts'
import { get, postItSafely, updateItSafely, deleteItSafely } from '../../../lib/http'
import './styles.css'

import Table from '../../Table/Index'
import Card from '../../Card/Index'

const titles = ["#", "Role", "Name", "Email", "Work Areas", "Registered On", "Actions"]

const Users = () => {
    const history = useHistory()
    const [users, serUsers] = useState(null)
    const [hidden, setHidden] = useState(false)
    const [count, setCount] = useState({ users: 0, admins: 0, blockUsers: 0 })
    const [formAccessCode, setFormAccessCode] = useState({ workArea: '', twoWorkArea: '', role: ''})
    const [accessCode, setAccessCode] = useState(null)
    
    const cards = [
        { title: "Registered Users",color: "secondary",icon: <FontAwesomeIcon icon={faUser} className="fs-3 me-2 text-secondary" />,count: count.users},
        { title: "Registered Admin",color: "warning",icon: <FontAwesomeIcon icon={faCrown} className="fs-3 me-2 text-warning" />,count: count.admins},
        { title: "Block Users",color: "danger",icon: <FontAwesomeIcon icon={faUserLock} className="fs-3 me-2 text-danger" />,count: count.blockUsers}
    ]
    
    const handleGetUsers = async () => {
        const res = await get('dashboard/users')
        const users = res.filter(user => user.email !== JSON.parse(localStorage.getItem('user')).email)
        serUsers(users)
        setCount({users: res.length, admins: res.filter(user => user.role === "Admin").length, blockUsers: res.filter(user => user.block).length})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAccessCode(null)
        if(formAccessCode.workArea === '' || formAccessCode.role === '') alertMessage('Empty fields', 'All fields are mandatory.', 'warning')
        else if((hidden && formAccessCode.twoWorkArea === '' )|| formAccessCode.role === '') alertMessage('Empty fields', 'All fields are mandatory.', 'warning')
        else if(hidden && formAccessCode.twoWorkArea === formAccessCode.workArea) alertMessage('Work Area Invalid', 'The work areas cannot be the same please choose different work areas.', 'error')
        else {
            const res = await postItSafely('dashboard/accessCode', formAccessCode)
            if(res.server === 'AccessCodeNotCreate') alertMessage('Error with access code', 'Could not generate the access code please try again later.', 'error')
            else if(res.server === 'AccessCodeCreate'){
                const confirm = await alertMessage('Access code generated', 'The access code has been generated correctly.', 'success')
                if(confirm.isConfirmed) setAccessCode(res.accessCode)
            } else if(res.server === 'SessionExpired') {
                const confirm = await alertMessage('Session expired', 'Your session has expired, please log in again.', 'warning')
                if(confirm.isConfirmed) {
                    auth.logOut(() => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        history.push('/auth')
                    })
                }
            }   
        }
    }

    const clearState = () => {
        const workArea = document.querySelectorAll('#workArea')
        const userRol = document.querySelector('#userRol')
        workArea[0].value = "Work Area..."
        if(hidden) workArea[1].value = "Two Work Area..."
        userRol.value = "User Type"
        setFormAccessCode({ workArea: '', twoWorkArea: '', role: ''})
    }

    const handleCopyAccessCode = async (input) => {
        clearState()
       if(input === 'accessCode') {
            const inputAccessCode = document.querySelector('#accessCode')
            inputAccessCode.focus()
            document.execCommand('selectAll')
            document.execCommand('copy')
        } else if(input === 'urlAccessCode') {
           const inputUrlAccessCode = document.querySelector('#urlAccessCode')
           inputUrlAccessCode.focus()
           document.execCommand('selectAll')
           document.execCommand('copy')
       }
        const confirm = await alertMessage('Copy access code...', '', 'success')
        if(confirm.isConfirmed) setAccessCode(null)
    }

    const handleBlockAndUnblock = async (msgConfirm, id, isBlocked, msgSuccess, msgError) => {
        const confirm = await alertConfirm(msgConfirm)
        if(confirm.isConfirmed) {
            try {
                const server = await( await updateItSafely(`dashboard/blockUser/${id}`, {block: isBlocked})).server
                if(server === 'BlockUser') alertMessage(msgSuccess[0], msgSuccess[1], 'success')
                else if(server === 'BlockNotUser') alertMessage(msgError[0], msgError[1], 'error')
                else if(server === 'SessionExpired') {
                    const confirm = await alertMessage('Session expired', 'Your session has expired, please log in again.', 'warning')
                    if(confirm.isConfirmed) {
                        auth.logOut(() => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('user')
                            history.push('/auth')
                        })
                    }
                }   
                handleGetUsers()
            } catch(e) {
                alertMessage('No Internet connection', 'No internet connection please check your internet.', 'error') 
            }
        }
    }

    const handleActions = async (action, id, name) => {
        if(action === 'block'){
            await handleBlockAndUnblock(`Are you sure you want to block "${name}"?.`, id, true, ['Block User', 'The user has been successfully blocked.'], ['Block Not User', 'The user has not been blocked.'])
        } else if(action === 'Unblock'){
            await handleBlockAndUnblock(`Are you sure you want to Unblock "${name}"?.`, id, false, ['Unblock User', 'The user has been successfully Unblocked.'], ['Unblock Not User', 'The user has not been Unblocked.'])
        } else if(action === 'delete'){
            const confirm = await alertConfirm(`Are you sure you want to Deleted "${name}"?.`)
            if(confirm.isConfirmed) {
               try {
                    const server = await( await deleteItSafely(`dashboard/deleteUser/${id}`)).server
                    if(server === 'UserDeleted') alertMessage('User Deleted', 'The user has been successfully Deleted.', 'success')
                    else if(server === 'UserNotDeleted') alertMessage('User Not Deleted', 'The user has not been Deleted.', 'error')
                    else if(server === 'SessionExpired') {
                        const confirm = await alertMessage('Session expired', 'Your session has expired, please log in again.', 'warning')
                        if(confirm.isConfirmed) {
                            auth.logOut(() => {
                                localStorage.removeItem('token')
                                localStorage.removeItem('user')
                                history.push('/auth')
                            })
                        }
                    }   
                    handleGetUsers()
                } catch(e) {
                   alertMessage('No Internet connection', 'No internet connection please check your internet.', 'error') 
                }
            }
        }
    }

    useEffect(() => {
        handleGetUsers()
    }, [])

    return (
        <>
            <div>
                <div className="mb-4">
                    <div className="row user-select-none">
                        {
                            cards.map((card, i) => (
                                <div className="col" key={i}>
                                    <Card  
                                        title={card.title} 
                                        icon={card.icon} 
                                        count={card.count} 
                                        color={card.color} 
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="mb-4">
                    <div className="card rounded-2 user-select-none">
                        <div className="card-header d-flex justify-content-between">
                            <div>
                                <span className="fs-4">Generate access code</span>
                            </div>
                            <div>
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="twoWorkAreas">Adding two work areas</label>
                                    <input className="form-check-input" type="checkbox" 
                                    onClick={() => {
                                        setHidden(!hidden)
                                        setAccessCode(null)
                                        clearState()
                                    }} id="twoWorkAreas" />
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col">
                                            <select className="form-select" id="workArea" name="workArea" defaultValue="Work Area..."  onChange={e => setFormAccessCode({ ...formAccessCode, workArea: e.target.value})}>
                                                <option disabled>Work Area...</option>
                                                <option value="Office">Office</option>
                                                <option value="SecretaryToTheDirector">Secretary to the director</option>
                                                <option value="Schoolchildren">Schoolchildren</option>
                                                <option value="PromotionAndLiaison">Promotion and Liaison</option>
                                                <option value="AdministrativeResources">Administrative Resources</option>
                                                <option value="Injunction">Injunction</option>
                                                <option value="Prefecture">Prefecture</option>
                                                <option value="SocialWork">Social Work</option>
                                                <option value="TechnicalTraining">Technical Training</option>
                                                <option value="Library">Library</option>
                                                <option value="Quality">Quality</option>
                                                <option value="Infrastructure">Infrastructure</option>
                                                <option value="Computing">Computing</option>
                                            </select>
                                    </div>
                                    {hidden 
                                        ? 
                                            <div className="col">
                                                <div className="mb-3">
                                                    <select className="form-select" id="workArea" name="workArea" defaultValue="Two Work Area..."  onChange={e => setFormAccessCode({ ...formAccessCode, twoWorkArea: e.target.value})}>
                                                        <option disabled>Two Work Area...</option>
                                                        <option value="Office">Office</option>
                                                        <option value="SecretaryToTheDirector">Secretary to the director</option>
                                                        <option value="Schoolchildren">Schoolchildren</option>
                                                        <option value="PromotionAndLiaison">Promotion and Liaison</option>
                                                        <option value="AdministrativeResources">Administrative Resources</option>
                                                        <option value="Injunction">Injunction</option>
                                                        <option value="Prefecture">Prefecture</option>
                                                        <option value="SocialWork">Social Work</option>
                                                        <option value="TechnicalTraining">Technical Training</option>
                                                        <option value="Library">Library</option>
                                                        <option value="Quality">Quality</option>
                                                        <option value="Infrastructure">Infrastructure</option>
                                                        <option value="Computing">Computing</option>
                                                    </select>
                                                </div>
                                            </div>
                                        : null
                                    }
                                    <div className="col">
                                        <div className="mb-3">
                                            <select className="form-select" id="userRol" name="userRol" defaultValue="User Type"  onChange={e => setFormAccessCode({ ...formAccessCode, role: e.target.value})}>
                                                <option disabled>User Type</option>
                                                <option value="Admin">Administrator</option>
                                                <option value="User">User</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3 d-grid gap-2">
                                            <button type="submit" className="btn btn-secondary">Generate Access Code</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            { accessCode !== null 
                                ? 
                                    <>
                                        <label htmlFor="accessCode" className="label-control">Access Code</label>
                                        <div className="mb-3 mt-2 d-flex align-items-center">
                                            <div className="w-100 me-2">
                                                <input type="text" className="form-control" id="accessCode" name="accessCode" defaultValue={accessCode} />
                                            </div>
                                            <div>
                                                <FontAwesomeIcon icon={faCopy} className="fs-4 pe-pointer" onClick={() => handleCopyAccessCode('accessCode')} />
                                            </div>
                                        </div>
                                        <label htmlFor="urlAccessCode" className="label-control">Url Access Code</label>
                                        <div className="mb-3 mt-2 d-flex align-items-center">
                                            <div className="w-100 me-2">
                                                <input type="text" className="form-control" id="urlAccessCode" name="urlAccessCode" defaultValue={`http://localhost:3000/auth?accessCode=${accessCode}`} />
                                            </div>
                                            <div>
                                                <FontAwesomeIcon icon={faCopy} className="fs-4 pe-pointer" onClick={() => handleCopyAccessCode('urlAccessCode')} />
                                            </div>
                                        </div>
                                    </>
                                : <></>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <Table titles={titles}>
                        {users !== null 
                            ? 
                                users.length > 0 
                                    ? 
                                        users.map((user, i) => (
                                            <tr key={user._id} className={user.block ? 'table-danger': 'table-light'}>
                                                <td>{i + 1}</td>
                                                <td><FontAwesomeIcon icon={user.role === 'Admin' ? faCrown : faUser} className={user.role === 'Admin' ? 'text-warning' : 'text-secondary'} /></td>
                                                <td>{user.name} {user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td><span className="pe-2">{user.workArea[0]}</span><span>{user.workArea.length > 1 && user.workArea[1] !== 'Users' ? user.workArea[1] : ''}</span></td>
                                                <td>{new Date(user.registeredOn).toLocaleDateString()}</td>
                                                <td>
                                                    {user.block
                                                        ? <button className="btn btn-warning rounded-2" onClick={() => handleActions('Unblock', user._id, `${user.name} ${user.lastName}`)}>Unblock</button>
                                                        : <button className="btn btn-warning rounded-2" onClick={() => handleActions('block', user._id, `${user.name} ${user.lastName}`)}>Block</button>
                                                    }
                                                    <button className="btn btn-danger rounded-2 ms-2" onClick={() => handleActions('delete', user._id, `${user.name} ${user.lastName}`)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    : <tr><td colSpan="8">No registered users...</td></tr>
                            : <tr><td colSpan="8">Loading...</td></tr>
                        }
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Users