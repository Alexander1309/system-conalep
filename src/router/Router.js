import { useContext } from 'react'
import {
    BrowserRouter,
    Redirect,
    Switch,
    Route,
} from 'react-router-dom'
import { settingContext } from '../contexts/settingContext'

import App from '../components/App/Index'
import Auth from '../components/Auth/Index'
import WorkArea from '../components/WorkAreas/Index'
import Dashboard from '../components/Dashboard/Index'
import NotFound from '../components/NotFound/Index'

const PrivateRoute = ({children, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={({ location }) => auth === true
            ? children
            : <Redirect push to={{pathname: "/", state: {from: location}}} />}
        />
    )
}

const Router = () => {
    const setting = useContext(settingContext)
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <App />
                    </Route>
                    <Route path="/auth">
                        <Auth />
                    </Route>
                    <PrivateRoute path="/workAreas/:workArea" auth={setting.isAuth}>
                        <WorkArea />
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard/:route" auth={setting.isAuth}>
                        <Dashboard />
                    </PrivateRoute> 
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Router