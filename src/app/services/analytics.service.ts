// analytics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  
  private apiURL = 'http://localhost:3000';  // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) { }

  getTramitesPorEstado(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/tramites-por-estado`);
  }
  getTramitesPorTema(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/tramites-por-tema`);
  }

  getCantidadTramitesPorNivelEducativo(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/tramites-por-nivel-educativo`);
  }

  getCantidadTramitesPorMunicipio(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/tramites-por-municipio`);
  }

  getCantidadPersonasPorNivelEducativo(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/personas-por-nivel-educativo`);
  }

}
