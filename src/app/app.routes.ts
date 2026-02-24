import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard';
import { authGuard } from './core/guards/auth-guard';
import { customerGuard } from './core/guards/customer-guard';
import { DeactivateGuard } from './core/guards/deactivate-guard';
export const routes: Routes = [
    {path: 'home', loadComponent: () => import('./home/home/home').then(m => m.Home)},
    {path: 'auth', loadComponent: () => import('./components/auth/auth').then(m => m.Auth)},
    {path: 'register', loadComponent: () => import('./components/register/register').then(m => m.Register)},
    {path: 'rooms', loadComponent: () => import('./components/rooms/rooms').then(m => m.Rooms)},
    {path: 'vehicles', loadComponent: () => import('./components/vehicles/vehicles').then(m => m.Vehicles)},
    {path: 'safaris', loadComponent: () => import('./components/safari/safari').then(m => m.Safari)},
    {
        path: 'my-account', loadComponent: () => import('./components/customer/my-account/my-account').then(m => m.MyAccount),
        canActivate:[authGuard],canDeactivate:[DeactivateGuard]

    },
    {
        path: 'admin', loadComponent: () => import('./components/admin/admin').then(m => m.Admin),
        canActivate: [adminGuard],
        children:[
            {
                path: 'rooms', loadComponent: () => import('./components/admin/room-management/room-management').then(m => m.RoomManagementComponent),
                canActivate: [adminGuard]

            },
            {
                path: 'vehicles', loadComponent: () => import('./components/admin/vehicle-management/vehicle-management').then(m => m.VehicleManagement),
                canActivate: [adminGuard]
            },
            {
                path: 'safaris', loadComponent: () => import('./components/admin/safari-management/safari-management').then(m => m.SafariManagementComponent)
            , canActivate: [adminGuard]},
        ]
    },
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];
