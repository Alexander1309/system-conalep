import { useEffect  } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../Header/Index'

const Home = () => {

    useEffect(() => {
        document.title = "Conalep - Home"
    }, [])

    return (
        <>
            <Header />
        </>
    )
}

export default withRouter(Home)