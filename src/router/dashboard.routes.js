import { faAngleRight, faUser } from "@fortawesome/free-solid-svg-icons"

import Users from '../components/Dashboard/Users/Index'

export const routes = [
    {
        path: '/dashboard/direccion',
        icon: faAngleRight,
        workArea: 'Direccion',
        title: 'Direccion',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/secDelDirector',
        icon: faAngleRight,
        workArea: 'SecDelDirector',
        title: 'Secretario Del Director',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/escolares',
        icon: faAngleRight,
        workArea: 'Escolares',
        title: 'Escolares',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/promAndVinculación',
        icon: faAngleRight,
        workArea: 'PromAndVinculación',
        title: 'Promoción y Vinculación',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/recAdministrativos',
        icon: faAngleRight,
        workArea: 'RecAdministrativos',
        title: 'Recursos Administrativos',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/preceptorias',
        icon: faAngleRight,
        workArea: 'Preceptorias',
        title: 'Preceptorías',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/prefectura',
        icon: faAngleRight,
        workArea: 'Prefectura',
        title: 'Prefectura',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/trabajoSocial',
        icon: faAngleRight,
        workArea: 'TrabajoSocial',
        title: 'Trabajo Social',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/formacionTecnica',
        icon: faAngleRight,
        workArea: 'FormacionTecnica',
        title: 'Formación técnica',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/biblioteca',
        icon: faAngleRight,
        workArea: 'Biblioteca',
        title: 'Biblioteca',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/calidad',
        icon: faAngleRight,
        workArea: 'Calidad',
        title: 'Calidad',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/infraestructura',
        icon: faAngleRight,
        workArea: 'Infraestructura',
        title: 'Infraestructura',
        roles: ['User', 'Admin']
    },
    {
        path: '/dashboard/Informatica',
        icon: faAngleRight,
        workArea: 'Informática',
        title: 'Informática',
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
    direccion: {
        title: 'Direccion',
        component: <h1>Direccion</h1>,
        roles: ['User', 'Admin']
    },
    secDelDirector: {
        title: 'Secretario Del Director',
        component: <h1>Secretario Del Director</h1>,
        roles: ['User', 'Admin']
    },
    escolares: {
        title: 'Escolares',
        component: <h1>Escolares</h1>,
        roles: ['User', 'Admin']
    },
    promAndVinculación: {
        title: 'Promoción y Vinculación',
        component: <h1>Promoción y Vinculación</h1>,
        roles: ['User', 'Admin']
    },
    RecAdministrativos: {
        title: 'Recursos Administrativos',
        component: <h1>Recursos Administrativos</h1>,
        roles: ['User', 'Admin']
    },
    preceptorias: {
        title: 'Preceptorías',
        component: <h1>Preceptorías</h1>,
        roles: ['User', 'Admin']
    },
    prefectura: {
        title: 'Prefectura',
        component: <h1>Prefectura</h1>,
        roles: ['User', 'Admin']
    },
    trabajoSocial: {
        title: 'Trabajo Social',
        component: <h1>Trabajo Social</h1>,
        roles: ['User', 'Admin']
    },
    formacionTecnica: {
        title: 'Formación Técnica',
        component: <h1>Formación Técnica</h1>,
        roles: ['User', 'Admin']
    },
    biblioteca: {
        title: 'Biblioteca',
        component: <h1>Biblioteca</h1>,
        roles: ['User', 'Admin']
    },
    calidad: {
        title: 'Calidad',
        component: <h1>Calidad</h1>,
        roles: ['User', 'Admin']
    },
    infraestructura: {
        title: 'Infraestructura',
        component: <h1>Infraestructura</h1>,
        roles: ['User', 'Admin']
    },
    informatica: {
        title: 'Informática',
        component: <h1>Informática</h1>,
        roles: ['User', 'Admin']
    },
    users: {
        title: 'Users',
        component: <Users />,
        roles: ['Admin']
    }
}
