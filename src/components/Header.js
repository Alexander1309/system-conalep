import { Link } from 'react-router-dom'
import Logo from '../img/logo-b.svg'

const Header = () => {
    return (
        <>
            <div className="container-fluid bg-dark">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <img src={Logo} alt="" className="d-inline-block align-text-top" />
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <div className="ms-auto">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/auth">Sign In</Link>
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