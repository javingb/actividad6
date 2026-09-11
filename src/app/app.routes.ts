import { Routes } from '@angular/router';
// Importamos desde la carpeta 'pages'
import { HomePage } from './pages/home/home.page';
import { InfoUsuarioPage } from './pages/info-usuario/info-usuario.page';
import { FormUsuarioPage } from './pages/form-usuario/form-usuario.page';
import { NotFoundPage } from './pages/not-found/not-found.page'; // Importamos la página 404

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage },                       
    { path: 'user/:_id', component: InfoUsuarioPage },         
    { path: 'newuser', component: FormUsuarioPage }, 
    { path: 'updateuser/:_id', component: FormUsuarioPage },
    { path: 'not-found', component: NotFoundPage },
    { path: '**', redirectTo: 'not-found' }
];