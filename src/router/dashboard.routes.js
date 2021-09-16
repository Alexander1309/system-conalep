import { faAngleRight, faUser } from "@fortawesome/free-solid-svg-icons"


export const routes = [
    {
        dashboardPath: '/dashboard/office',
        workAreasPath: 'office',
        icon: faAngleRight,
        workArea: 'Office',
        titles: ['Office', 'Direccion'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/secretaryToTheDirector',
        workAreasPath: 'secretaryToTheDirector',
        icon: faAngleRight,
        workArea: 'SecretaryToTheDirector',
        titles: ['Secretary to the director', 'Secretario del director'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/schoolchildren',
        workAreasPath: 'schoolchildren',
        icon: faAngleRight,
        workArea: 'Schoolchildren',
        titles: ['Schoolchildren', 'Escolares'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/promotionAndLiaison',
        workAreasPath: 'promotionAndLiaison',
        icon: faAngleRight,
        workArea: 'PromotionAndLiaison',
        titles: ['Promotion and Liaison', 'Promocion y Vinculacion'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/administrativeResources',
        workAreasPath: 'administrativeResources',
        icon: faAngleRight,
        workArea: 'AdministrativeResources',
        titles: ['Administrative Resources', 'Recursos administrativos'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/injunction',
        workAreasPath: 'injunction',
        icon: faAngleRight,
        workArea: 'Injunction',
        titles: ['Injunction', 'Preceptorias'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/prefecture',
        workAreasPath: 'prefecture',
        icon: faAngleRight,
        workArea: 'Prefecture',
        titles: ['Prefecture', 'Prefectura'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/socialWork',
        workAreasPath: 'socialWork',
        icon: faAngleRight,
        workArea: 'SocialWork',
        titles: ['Social Work', 'Trabajo Social'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/technicalTraining',
        workAreasPath: 'technicalTraining',
        icon: faAngleRight,
        workArea: 'TechnicalTraining',
        titles: ['Technical Training', 'Formación técnica'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/library',
        workAreasPath: 'library',
        icon: faAngleRight,
        workArea: 'Library',
        titles: ['Library', 'Biblioteca'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/quality',
        workAreasPath: 'quality',
        icon: faAngleRight,
        workArea: 'Quality',
        titles: ['Quality', 'Calidad'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/infrastructure',
        workAreasPath: 'infrastructure',
        icon: faAngleRight,
        workArea: 'Infrastructure',
        titles: ['Infrastructure', 'Infraestructura'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/computing',
        workAreasPath: 'computing',
        icon: faAngleRight,
        workArea: 'Computing',
        titles: ['Computing', 'Informatica'],
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/users',
        icon: faUser,
        workArea: 'Users',
        titles: ['Users', 'Usuarios'],
        roles: ['Admin']
    },
]