import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './styles.css'

import Sidebar from '../Sidebar/Index'
import Users from '../Users/Index'

const Dashboard = () => {
    const { route } = useParams()
    
    const handleView = () => {
        if(route === 'users') return <Users />
    }
    
    useEffect(() => {
        document.title = "Conalep - Dashboard"
    }, [])
    return (
        <>
            <div className="container-fluid d-flex">
                <Sidebar />
                {handleView()}
            </div>
        </>
    )
}

export default Dashboard