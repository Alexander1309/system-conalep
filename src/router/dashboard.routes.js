import { faAngleRight, faUser } from "@fortawesome/free-solid-svg-icons"


import View from '../components/Dashboard/Home/Index'
import Users from '../components/Dashboard/Users/Index'

export const routes = [
    {
        path: '/dashboard/office',
        icon: faAngleRight,
        workArea: 'Office',
        title: 'Office',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/secretaryToTheDirector',
        icon: faAngleRight,
        workArea: 'SecretaryToTheDirector',
        title: 'Secretary to the director',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/schoolchildren',
        icon: faAngleRight,
        workArea: 'Schoolchildren',
        title: 'Schoolchildren',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/promotionAndLiaison',
        icon: faAngleRight,
        workArea: 'PromotionAndLiaison',
        title: 'Promotion and Liaison',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/administrativeResources',
        icon: faAngleRight,
        workArea: 'AdministrativeResources',
        title: 'Administrative Resources',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/injunction',
        icon: faAngleRight,
        workArea: 'Injunction',
        title: 'Injunction',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/prefecture',
        icon: faAngleRight,
        workArea: 'Prefecture',
        title: 'Prefecture',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/socialWork',
        icon: faAngleRight,
        workArea: 'SocialWork',
        title: 'Social Work',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/technicalTraining',
        icon: faAngleRight,
        workArea: 'TechnicalTraining',
        title: 'Technical Training',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/library',
        icon: faAngleRight,
        workArea: 'Library',
        title: 'Library',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/quality',
        icon: faAngleRight,
        workArea: 'Quality',
        title: 'Quality',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/infrastructure',
        icon: faAngleRight,
        workArea: 'Infrastructure',
        title: 'Infrastructure',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/computing',
        icon: faAngleRight,
        workArea: 'Computing',
        title: 'Computing',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/users',
        icon: faUser,
        title: 'Users',
        workArea: 'Users',
        roles: ['Admin']
    },
]

export const component = {
    office: {
        title: 'Office',
        component: <h1>Direccion</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    secretaryToTheDirector: {
        title: 'secretary to the director',
        component: <h1>Secretario Del Director</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    schoolchildren: {
        title: 'Schoolchildren',
        component: <h1>Escolares</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    promotionAndLiaison: {
        title: 'Promotion and Liaison',
        component: <h1>Promoción y Vinculación</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    administrativeResources: {
        title: 'Administrative Resources',
        component: <h1>Recursos Administrativos</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    injunction: {
        title: 'Injunction',
        component: <h1>Mandato</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    prefecture: {
        title: 'Prefecture',
        component: <h1>Prefectura</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    socialWork: {
        title: 'Social Work',
        component: <h1>Trabajo Social</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    technicalTraining: {
        title: 'Technical Training',
        component: <h1>Formación Técnica</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    library: {
        title: 'Library',
        component: <h1>Biblioteca</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    quality: {
        title: 'Quality',
        component: <h1>Calidad</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    infrastructure: {
        title: 'Infrastructure',
        component: <h1>Infraestructura</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    computing: {
        title: 'Computing',
        component: <h1>Informática</h1>,
        dashboard: <View />,
        roles: ['User', 'Admin']
    },
    search: {
        title: 'Search',
        component: <h1>Search</h1>,
        roles: ['User', 'Admin']
    },
    users: {
        title: 'Users',
        dashboard: <Users />,
        roles: ['Admin']
    }
}
