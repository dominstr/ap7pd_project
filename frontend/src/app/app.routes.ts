import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Details} from './components/details/details';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "details/:id", component: Details},
    { path: "**", redirectTo: ""}   // redirection to home from nonexisting path
];
