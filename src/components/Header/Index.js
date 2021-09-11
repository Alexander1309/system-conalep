import { Link, useHistory } from 'react-router-dom'
import { routes } from '../../router/dashboard.routes'
import auth from '../../lib/auth'
import Logo from '../../img/logo-b.svg'

const Header = () => {
    const history = useHistory()
    return (
        <>
            <div className="container-fluid bg-dark sticky-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <Link to="/">
                                <img src={Logo} alt="Logo conalep" className="d-inline-block align-text-top" />
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <div className="ms-auto">
                                    <ul className="navbar-nav ms-3">
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" to="#" id="worksAre" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                WorkAreas
                                            </Link>
                                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="worksAre">
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/office">Office</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/secretaryToTheDirector">Secretary to the director</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/schoolchildren">Schoolchildren</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/promotionAndLiaison">Promotion and Liaison</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/administrativeResources">Administrative Resources</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/injunction">Injunction</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/prefecture">Prefecture</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/socialWork">Social Work</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/technicalTraining">Technical Training</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/library">Library</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/quality">Quality</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/infrastructure">Infrastructure</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/computing">Computing</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link className="nav-link" to={routes.find(r => r.roles.indexOf(JSON.parse(localStorage.getItem('user')).role) > -1 && JSON.parse(localStorage.getItem('user')).workArea.indexOf(r.workArea) > -1).dashboardPath}>Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link className="nav-link" to="#" onClick={() => {
                                                auth.logOut(() => {
                                                    localStorage.removeItem('token')
                                                    localStorage.removeItem('user')
                                                    history.push('/')
                                                })
                                            }}>Log Out</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Header