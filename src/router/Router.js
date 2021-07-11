import {
    BrowserRouter,
    Redirect,
    Switch,
    Route,
} from 'react-router-dom'
import App from '../App'
import Auth from '../components/Auth/Index'

const PrivateRoute = ({children, isPrivate , authed, url, ...rest}) => {
    return (
      isPrivate === true
        ? <Route
            {...rest}
            render={(props) => authed === true
            ? children
            : <Redirect to={{pathname: url, state: {from: props.location}}} />}
        />
        : <Route
            {...rest}
            render={(props) => authed === false
            ? children
            : <Redirect to={{pathname: url, state: {from: props.location}}} />}
        />
    )
}

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <App />
                    </Route>
                    <PrivateRoute path="/auth" isPrivate={false} authed={false} url="/" >
                        <Auth />
                    </PrivateRoute>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Router