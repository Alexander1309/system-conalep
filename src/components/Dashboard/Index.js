import { useParams, Redirect } from 'react-router-dom'
import { component } from '../../router/dashboard.routes'
import './styles.css'

import Sidebar from './Sidebar/Index'

const Dashboard = () => {
    const { route } = useParams()
    
    const handleView = () => {
        if(component.hasOwnProperty(route) && component[route].roles.indexOf(JSON.parse(localStorage.getItem('user')).role) > -1  && JSON.parse(localStorage.getItem('user')).workArea.indexOf(`${route.charAt(0).toUpperCase()}${route.slice(1)}`) > -1) {
            document.title = `Conalep - Dashboard / ${component[route].title}`
            return component[route].component
        }
        document.title = 'Conalep - Dashboard / 404'
        return <Redirect to="/404" />
    }
    
    return (
        <>
            <div className="container-fluid">
                <Sidebar />
                <div className="container-dashboard mt-5">
                    <div>
                        {handleView()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard