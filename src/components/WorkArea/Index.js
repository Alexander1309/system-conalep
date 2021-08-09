import { useParams, Redirect } from 'react-router-dom'
import Header from '../Header/Index'
import { component } from '../../router/workArea.routes'

const WorkArea = () => {
    const { workArea } = useParams()

    const handleView = () => {
        if(component.hasOwnProperty(workArea) && component[workArea].roles.indexOf(JSON.parse(localStorage.getItem('user')).role) > -1) {
            document.title = `Conalep - Work Area / ${component[workArea].title}`
            return component[workArea].component
        }
        document.title = 'Conalep - Dashboard / 404'
        return <Redirect to="/404" />
    }

    return (
        <>
            <Header />
            <div className="container mt-3">
                {handleView()}
            </div>
        </>
    )
}

export default WorkArea