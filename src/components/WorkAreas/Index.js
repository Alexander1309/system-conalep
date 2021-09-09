import { useParams, Redirect } from 'react-router-dom'
import Header from '../Header/Index'
import { component } from '../../router/dashboard.routes'

const WorkArea = () => {
    const { workArea } = useParams()

    const handleView = () => {
        if(component.hasOwnProperty(workArea) && component[workArea].title !== 'Users') {
            document.title = `Conalep - Work Areas / ${component[workArea].title}`
            return component[workArea].component
        }
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