import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavComponent } from './shared/nav/nav.component';
import{ReactiveFormsModule} from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import { NewTramiteComponent } from './pages/new-tramite/new-tramite.component';
import { ConsultarTramiteComponent } from './pages/consultar-tramite/consultar-tramite.component';
import { ModificarTramiteComponent } from './pages/modificar-tramite/modificar-tramite.component';
import { BorrarTramiteComponent } from './pages/borrar-tramite/borrar-tramite.component';
import { DataAnalyticsComponent } from './pages/data-analytics/data-analytics.component';
import { DataAnalytics2Component } from './pages/data-analytics2/data-analytics2.component';
import { DataAnalytics3Component } from './pages/data-analytics3/data-analytics3.component';
import { DataAnalytics4Component } from './pages/data-analytics4/data-analytics4.component';
import { DataAnalytics5Component } from './pages/data-analytics5/data-analytics5.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    NewTramiteComponent,
    ConsultarTramiteComponent,
    ModificarTramiteComponent,
    BorrarTramiteComponent,
    DataAnalyticsComponent,
    DataAnalytics2Component,
    DataAnalytics3Component,
    DataAnalytics4Component,
    DataAnalytics5Component
  

   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
