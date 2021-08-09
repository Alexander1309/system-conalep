import {
    BrowserRouter,
    Redirect,
    Switch,
    Route,
} from 'react-router-dom'
import auth from '../lib/auth'

import App from '../components/App/Index'
import Auth from '../components/Auth/Index'
import WorkArea from '../components/WorkArea/Index'
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
                    <PrivateRoute path="/workArea/:workArea" auth={auth.isAuth()}>
                        <WorkArea />
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard/:route" auth={auth.isAuth()}>
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