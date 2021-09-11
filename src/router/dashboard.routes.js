import { faAngleRight, faUser } from "@fortawesome/free-solid-svg-icons"


export const routes = [
    {
        dashboardPath: '/dashboard/office',
        workAreasPath: 'office',
        icon: faAngleRight,
        workArea: 'Office',
        title: 'Office',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/secretaryToTheDirector',
        workAreasPath: 'secretaryToTheDirector',
        icon: faAngleRight,
        workArea: 'SecretaryToTheDirector',
        title: 'Secretary to the director',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/schoolchildren',
        workAreasPath: 'schoolchildren',
        icon: faAngleRight,
        workArea: 'Schoolchildren',
        title: 'Schoolchildren',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/promotionAndLiaison',
        workAreasPath: 'promotionAndLiaison',
        icon: faAngleRight,
        workArea: 'PromotionAndLiaison',
        title: 'Promotion and Liaison',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/administrativeResources',
        workAreasPath: 'administrativeResources',
        icon: faAngleRight,
        workArea: 'AdministrativeResources',
        title: 'Administrative Resources',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/injunction',
        workAreasPath: 'injunction',
        icon: faAngleRight,
        workArea: 'Injunction',
        title: 'Injunction',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/prefecture',
        workAreasPath: 'prefecture',
        icon: faAngleRight,
        workArea: 'Prefecture',
        title: 'Prefecture',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/socialWork',
        workAreasPath: 'socialWork',
        icon: faAngleRight,
        workArea: 'SocialWork',
        title: 'Social Work',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/technicalTraining',
        workAreasPath: 'technicalTraining',
        icon: faAngleRight,
        workArea: 'TechnicalTraining',
        title: 'Technical Training',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/library',
        workAreasPath: 'library',
        icon: faAngleRight,
        workArea: 'Library',
        title: 'Library',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/quality',
        workAreasPath: 'quality',
        icon: faAngleRight,
        workArea: 'Quality',
        title: 'Quality',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/infrastructure',
        workAreasPath: 'infrastructure',
        icon: faAngleRight,
        workArea: 'Infrastructure',
        title: 'Infrastructure',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/computing',
        workAreasPath: 'computing',
        icon: faAngleRight,
        workArea: 'Computing',
        title: 'Computing',
        roles: ['User', 'Admin']
    },
    {
        dashboardPath: '/dashboard/users',
        icon: faUser,
        title: 'Users',
        workArea: 'Users',
        roles: ['Admin']
    },
]