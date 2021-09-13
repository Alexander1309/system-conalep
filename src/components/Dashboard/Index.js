import { useParams, Redirect } from 'react-router-dom'
import { routes } from '../../router/dashboard.routes'
import './styles.css'

import Sidebar from './Sidebar/Index'
import Home from './Home/Index'
import Users from './Users/Index'

const Dashboard = () => {
    const { route } = useParams()
    
    const handleView = () => {
        document.title = `Conalep - Dashboard / ${route === 'users' ? 'Users' : routes[routes.findIndex(r => r.workAreasPath === route && JSON.parse(localStorage.getItem('user')).workArea.indexOf(r.workArea) > -1)].title}`
        return (JSON.parse(localStorage.getItem('user')).role === 'Admin' && route === 'users') ? <Users /> : (routes[routes.findIndex(r => r.workAreasPath === route && JSON.parse(localStorage.getItem('user')).workArea.indexOf(r.workArea) > -1)] !== undefined) ? <Home /> : <Redirect to="/404" />
    }
    
    return (
        <>
            <div className="container-fluid">
                <Sidebar />
                <div className="container-dashboard mt-3">
                    <div>
                        {handleView()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard