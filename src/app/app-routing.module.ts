import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { NewTramiteComponent } from './pages/new-tramite/new-tramite.component';
import { ConsultarTramiteComponent } from './pages/consultar-tramite/consultar-tramite.component';
import { ModificarTramiteComponent } from './pages/modificar-tramite/modificar-tramite.component';
import { BorrarTramiteComponent } from './pages/borrar-tramite/borrar-tramite.component';
import { DataAnalyticsComponent } from './pages/data-analytics/data-analytics.component';
import { DataAnalytics2Component } from './pages/data-analytics2/data-analytics2.component';
import { DataAnalytics3Component } from './pages/data-analytics3/data-analytics3.component';
import { DataAnalytics4Component } from './pages/data-analytics4/data-analytics4.component';
import { DataAnalytics5Component } from './pages/data-analytics5/data-analytics5.component';





const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'new-tramite', component: NewTramiteComponent,canActivate: [AuthGuard] },
  {path: 'modificar-tramite', component: ModificarTramiteComponent,canActivate: [AuthGuard] },  // Añadir esta línea
  {path: 'consultar-tramite', component: ConsultarTramiteComponent,canActivate: [AuthGuard] },  // Añadir esta línea
  {path: 'eliminar-tramite', component: BorrarTramiteComponent,canActivate: [AuthGuard] },
  {path: 'data-analytics', component: DataAnalyticsComponent,canActivate: [AuthGuard] },  // Añadir esta línea  // Añadir esta línea
  {path: 'data-analytics2', component: DataAnalytics2Component,canActivate: [AuthGuard] },  // Añadir esta línea  // Añadir esta línea
  {path: 'data-analytics3', component: DataAnalytics3Component,canActivate: [AuthGuard] },  // Añadir esta línea  // Añadir esta línea
  {path: 'data-analytics4', component: DataAnalytics4Component,canActivate: [AuthGuard] },  // Añadir esta línea  // Añadir esta línea
  {path: 'data-analytics5', component: DataAnalytics5Component,canActivate: [AuthGuard] },  // Añadir esta línea  // Añadir esta línea

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}