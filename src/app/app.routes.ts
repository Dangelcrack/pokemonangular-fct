import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';
import { GymListComponent } from './pages/gym-list/gym-list.component'; 
import { GymAddComponent } from './pages/gym-add/gym-add.component';    
import { GymEditComponent } from './pages/gym-edit/gym-edit.component'; 
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorPersonalizadoComponent } from './error-personalizado/error-personalizado.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hola-mundo', component: HelloWorldComponent },
  { path: 'pokemon', component: PokemonListComponent },
  { path: 'gimnasios', component: GymListComponent, canActivate: [AuthGuard] }, 
  { path: 'gimnasios/anadir', component: GymAddComponent, canActivate: [AuthGuard] },
  { path: 'gimnasios/editar/:id', component: GymEditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginGoogleComponent },
  { path: '**', component : ErrorPersonalizadoComponent }  // Página de error personalizada para rutas no encontradas
];
