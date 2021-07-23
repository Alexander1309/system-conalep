import {
    BrowserRouter,
    Redirect,
    Switch,
    Route,
} from 'react-router-dom'
import auth from '../lib/auth'
import App from '../App'
import Auth from '../components/Auth/Index'
import Home from '../components/Home/Index'

const PrivateRoute = ({children, auth, url, ...rest}) => {
    return (
        <Route
            {...rest}
            render={({ location }) => auth === true
            ? children
            : <Redirect push to={{pathname: url, state: {from: location}}} />}
        />
    )
}

const NoMatch = () => {
    return (
        <h1>404</h1>
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
                    <Route path="/auth/:id">
                        <Auth />
                    </Route>
                    <PrivateRoute path="/home" auth={auth.isAuth()} url="/">
                        <Home />
                    </PrivateRoute>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Router