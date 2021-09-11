import { useParams } from 'react-router-dom'
import Header from '../Header/Index'
import { routes } from '../../router/dashboard.routes'

const WorkArea = () => {
    const { workArea } = useParams()
    document.title = `Conalep - Work Areas / ${routes[routes.findIndex(r => r.workAreasPath === workArea)].title}`

    return (
        <>
            <Header />
            <div className="container mt-3">
                <h1>{workArea.toUpperCase()}</h1>
            </div>
        </>
    )
}

export default WorkArea