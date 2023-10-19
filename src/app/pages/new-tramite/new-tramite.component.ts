import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Cambia 'Route' por 'Router

@Component({
  selector: 'app-new-tramite',
  templateUrl: './new-tramite.component.html',
  styleUrls: ['./new-tramite.component.css']
})
export class NewTramiteComponent {
  formulario: FormGroup;
  submitted = false; 
  municipios: any[] =[];
  nivelesEducativos: any[]=[]; 
  temas: any[]=[]; 

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { 
    this.formulario = this.fb.group({

        nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
        curp: ['', [Validators.required, this.validarCURP]],
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        paterno: ['', [Validators.required, Validators.minLength(3)]],
        materno: ['', [Validators.required, Validators.minLength(3)]],
        telefono: ['', [Validators.required, this.validarTelefono]],
        celular: ['', [Validators.required, this.validarTelefono]],
        correo: ['', [Validators.required, Validators.email]],
        nivel: ['0', [Validators.required, this.validarNoSeleccionar('0')]],
        municipio: ['0', [Validators.required, this.validarNoSeleccionar('0')]],
        tema: ['0', [Validators.required, this.validarNoSeleccionar('0')]],
    });
  }

  validarCURP(control: AbstractControl): {[key: string]: boolean} | null {
    const input = control.value;
    if (!input || typeof input !== 'string') return { 'validarCURP': true };
    const isValid = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{2}[A-Z0-9]{4}[0-9A]$/.test(input.trim());
    return isValid ? null : { 'validarCURP': true };
  }

  validarTelefono(control: AbstractControl): {[key: string]: boolean} | null {
    const input = control.value;
    if (!input) return { 'validarTelefono': true };
    const isValid = /^[0-9]{10,13}$/.test(input.trim());
    return isValid ? null : { 'validarTelefono': true };
  }

  validarNoSeleccionar(valueToExclude: string) {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      if (control.value === valueToExclude) {
        return { required: true };
      }
      return null;
    };
  }

  onSubmit() {
    this.submitted = true;
    if (this.formulario.valid) {
      console.log(this.formulario.value); 
        // Enviar los datos al servidor
        this.http.post('http://localhost:3000/tramites-nuevos', this.formulario.value).subscribe(response => {
            console.log('Solicitud enviada con éxito', response);
            alert('Solicitud enviada con éxito');
        }, error => {
            console.error('Error al enviar la solicitud', error);
            alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        });
    } else {
        // El formulario tiene errores, muestra mensajes de error junto a los campos
        alert("Por favor, corrige los errores en el formulario antes de enviar.");
    }
}
  ngOnInit() {
    // Realizar solicitud HTTP para obtener los datos
    this.http.get<any>('http://localhost:3000/get-data').subscribe(data => {
      this.municipios = data.municipios;
      this.nivelesEducativos = data.nivelesEducativos;
      this.temas = data.temas;
    });
  }

  regresar() {
    // Código para manejar la acción de regresar, por ejemplo:
    this.router.navigate(['/dashboard']);
}
}

