import { faHome, faUser } from "@fortawesome/free-solid-svg-icons"

import Home from '../components/Dashboard/Home'
import Users from '../components/Users/Index'

export const routes = [
    {
        path: '/dashboard/home',
        icon: faHome,
        title: 'Home',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/users',
        icon: faUser,
        title: 'Users',
        roles: ['Admin']
    },
]

export const component = {
    home: {
        title: 'Home',
        component: <Home />,
        roles: ['User', 'Admin']
    },
    users: {
        title: 'Users',
        component: <Users />,
        roles: ['Admin']
    }
}
