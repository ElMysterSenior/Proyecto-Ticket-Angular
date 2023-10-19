import { Component, OnInit} from '@angular/core';
import { FormBuilder,Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/services/auth/login.Request';
import { LoginService } from 'src/app/services/auth/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginError:string="";
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(/[A-Za-z]{3,}\d+/)]],  // Cambiado de 'usuario' a 'username'
    password: ['', [Validators.required, Validators.pattern(/[A-Za-z]{3,}\d+/)]],
});


  constructor(private formBuilder: FormBuilder, private router:Router, private loginService:LoginService) { 

  }

  

  ngOnInit():void{

  }

  login() {
    if (this.loginForm.valid) {
        this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
            next: (userData) => {
                console.log(userData);
                this.router.navigateByUrl('/dashboard');
                this.loginForm.reset();
            },
            error: (error) => {
                console.error(error);
                this.loginError = error.message;
            }
        });
    } else {
        this.loginForm.markAllAsTouched();
        console.log('Formulario inválido.');
    }
}

  regresar(){
    this.router.navigateByUrl('/login');
  }

  onSubmit() {

  }
  
}
