import { Link, withRouter } from 'react-router-dom'
import auth from '../../lib/auth'
import Logo from '../../img/logo-b.svg'

const Header = ({ history }) => {
    return (
        <>
            <div className="container-fluid bg-dark">
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
                                    <ul className="navbar-nav">
                                        <li>
                                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
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

export default withRouter(Header)