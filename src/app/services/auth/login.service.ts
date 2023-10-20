import { Injectable } from '@angular/core';
import { LoginRequest } from './login.Request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false); //cUALQUIER USUARIO QUE INGRESE NO ESTARA LOGEADO
  currentUserData:BehaviorSubject<User> = new BehaviorSubject<User>({id:0,username:'',role:''})

  constructor(private http:HttpClient) { }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<{ success: boolean, user: User, token: string }>('http://localhost:3000/authenticate', credentials).pipe(
      map(response => {
        localStorage.setItem('authToken', response.token);  // Asegúrate de que esta línea esté presente y funcionando correctamente
        this.currentUserData.next(response.user);
        this.currentUserLoginOn.next(true);
        return response.user;
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    // Eliminar el token JWT de localStorage
    localStorage.removeItem('authToken');
    this.currentUserData.next({id:0, username:'', role:''});
    this.currentUserLoginOn.next(false);
  }

private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
        console.error('Ocurrió un error:', error.error);
    } else if (error.status === 401) {
        return throwError(() => new Error('Nombre de usuario o contraseña incorrectos'));
    } else {
        console.error(`El backend retornó el código de estado ${error.status}, ` + `el cuerpo fue: ${error.error}`);
    }
    return throwError(() => new Error('Intenta nuevamente, algo falló'));
}



get userData(): Observable<User> {
  return this.currentUserData.asObservable();
}

get userLoginOn(): Observable<boolean> {
  return this.currentUserLoginOn.asObservable();
}
get userLoginOnValue(): boolean {
  return this.currentUserLoginOn.value;
}
}
