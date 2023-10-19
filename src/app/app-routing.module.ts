import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { NewTramiteComponent } from './pages/new-tramite/new-tramite.component';
import { ConsultarTramiteComponent } from './pages/consultar-tramite/consultar-tramite.component';





const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'new-tramite', component: NewTramiteComponent,canActivate: [AuthGuard] },
  {path: 'consultar-tramite', component: ConsultarTramiteComponent,canActivate: [AuthGuard] },  // Añadir esta línea
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}