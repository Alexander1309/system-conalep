import { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { routes } from '../../router/dashboard.routes'
import { settingContext } from '../../contexts/settingContext'
import Logo from '../../img/logo-b.svg'
import { FormattedMessage } from 'react-intl'

const Header = () => {
    const history = useHistory()
    const setting = useContext(settingContext)
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
                                                <FormattedMessage id="workAreas" defaultMessage="Work Areas" />
                                            </Link>
                                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="worksAre">
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/office">
                                                        <FormattedMessage id="workAreas.office" defaultMessage="Office" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/secretaryToTheDirector">
                                                        <FormattedMessage id="workAreas.secretaryToTheDirector" defaultMessage="Secretary to the director" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/schoolchildren">
                                                        <FormattedMessage id="workAreas.schoolchildren" defaultMessage="Schoolchildren" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/promotionAndLiaison">
                                                        <FormattedMessage id="workAreas.promotionAndLiaison" defaultMessage="Promotion and Liaison" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/administrativeResources">
                                                        <FormattedMessage id="workAreas.administrativeResources" defaultMessage="Administrative Resources" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/injunction">
                                                        <FormattedMessage id="workAreas.injunction" defaultMessage="Injunction" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/prefecture">
                                                        <FormattedMessage id="workAreas.prefecture" defaultMessage="Prefecture" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/socialWork">
                                                        <FormattedMessage id="workAreas.socialWork" defaultMessage="Social Work" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/technicalTraining">
                                                        <FormattedMessage id="workAreas.technicalTraining" defaultMessage="Technical Training" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/library">
                                                        <FormattedMessage id="workAreas.library" defaultMessage="Library" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/quality">
                                                       <FormattedMessage id="workAreas.quality" defaultMessage="Quality" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/infrastructure">
                                                        <FormattedMessage id="workAreas.infrastructure" defaultMessage="Infrastructure" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/workAreas/computing">
                                                        <FormattedMessage id="workAreas.computing" defaultMessage="Computing" />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link className="nav-link" to={routes.find(r => r.roles.indexOf(JSON.parse(localStorage.getItem('user')).role) > -1 && JSON.parse(localStorage.getItem('user')).workArea.indexOf(r.workArea) > -1).dashboardPath}>
                                               <FormattedMessage id="header.dashboard" defaultMessage="Dashboard" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="nav-link" to="#" onClick={() => {
                                                setting.logOut(() => {
                                                    localStorage.removeItem('token')
                                                    localStorage.removeItem('user')
                                                    history.push('/')
                                                })
                                            }}>
                                                <FormattedMessage id="header.logOut" defaultMessage="Log Out" />
                                            </Link>
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