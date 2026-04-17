import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { NewApplication } from './Pages/new-application/new-application';
import { ApplicationList } from './Pages/application-list/application-list';
import { Register } from './Pages/register/register';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'new-form',
        component: NewApplication
    },
    {
        path: 'application-list',
        component: ApplicationList
    },
    {
        path: 'register',
        component: Register
    }
];
