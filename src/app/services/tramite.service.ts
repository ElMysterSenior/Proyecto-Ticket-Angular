// tramite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  
  private apiURL = 'http://localhost:3000';  // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) { }

  consultarTramite(curp: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/consultar-tramite/${curp}`);
  }
}
