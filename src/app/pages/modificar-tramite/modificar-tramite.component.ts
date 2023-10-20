import { Component, OnInit } from '@angular/core';
import { TramiteService } from '../../services/tramite.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar-tramite',
  templateUrl: './modificar-tramite.component.html',
  styleUrls: ['./modificar-tramite.component.css']
})
export class ModificarTramiteComponent implements OnInit {
  

  formulario: FormGroup = new FormGroup({});
  estadoModificacion: 'none' | 'intermediario' | 'persona' | 'status' = 'none';

  constructor(
    private tramiteService: TramiteService,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombreCompleto: [''],
      curp: ['', Validators.required],
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      telefono: [''],
      celular: [''],
      email: ['', [Validators.email]],
      nivel: [''],
      municipio: [''],
      tema: [''],
      status: ['']
      
    });
  
  }

  buscarDatosPorCurp(): void {
    const curp = this.formulario.get('curp')?.value;

    this.tramiteService.consultarTramite(curp).subscribe(data => {
      console.log('Datos obtenidos del servicio:', data);

      if (data && data.length > 0) {
        const tramite = data[0];
        this.estadoModificacion = 'intermediario';

        this.formulario.patchValue({
          nombreCompleto: tramite.nombreCompleto,
          curp: tramite.curp,
          nombre: tramite.nombre,
          apellidoPaterno: tramite.paterno,
          apellidoMaterno: tramite.materno,
          telefono: tramite.telefono,
          celular: tramite.celular,
          email: tramite.correo,
          nivel: tramite.nivelEducativo,
          municipio: tramite.municipio,
          tema: tramite.tema,
          status: tramite.status
        });

        // Agrega las validaciones requeridas a los campos después de obtener los datos
        this.actualizarValidaciones();
      }
    }, error => {
      console.error("Hubo un error al consultar el trámite:", error);
    });
  }

  actualizarValidaciones(): void {
    if (this.estadoModificacion !== 'none') {
      // Agrega validadores requeridos a los campos que deben ser requeridos
      this.formulario.get('nombreCompleto')?.setValidators([Validators.required]);
      this.formulario.get('nombre')?.setValidators([Validators.required]);
      this.formulario.get('apellidoPaterno')?.setValidators([Validators.required]);
      this.formulario.get('apellidoMaterno')?.setValidators([Validators.required]);
      this.formulario.get('telefono')?.setValidators([Validators.required]);
      this.formulario.get('celular')?.setValidators([Validators.required]);
      this.formulario.get('email')?.setValidators([Validators.required, Validators.email]);
      this.formulario.get('nivel')?.setValidators([Validators.required]);
      this.formulario.get('municipio')?.setValidators([Validators.required]);
      this.formulario.get('tema')?.setValidators([Validators.required]);
      this.formulario.get('status')?.setValidators([Validators.required]);
    } else {
      // Quita los validadores requeridos de los campos
      this.formulario.get('nombreCompleto')?.clearValidators();
      this.formulario.get('nombre')?.clearValidators();
      this.formulario.get('apellidoPaterno')?.clearValidators();
      this.formulario.get('apellidoMaterno')?.clearValidators();
      this.formulario.get('telefono')?.clearValidators();
      this.formulario.get('celular')?.clearValidators();
      this.formulario.get('email')?.clearValidators();
      this.formulario.get('nivel')?.clearValidators();
      this.formulario.get('municipio')?.clearValidators();
      this.formulario.get('tema')?.clearValidators();
      this.formulario.get('status')?.clearValidators();
    }

    // Actualiza los cambios en los validadores
    this.formulario.updateValueAndValidity();
  }

  modificarIntermediario(): void {
    if (this.formulario.valid) {
      const curp = this.formulario.get('curp')?.value; // Obtener la CURP desde el formulario
      const datosIntermediario = {
        curp: curp, // Incluir la CURP en los datos para buscar y actualizar
        nombreCompleto: this.formulario.get('nombreCompleto')?.value,
        // Agrega aquí otros campos específicos de Intermediario que debas enviar
      };
  
      this.tramiteService.modificarTramite(datosIntermediario).subscribe(
        () => {
          alert('Persona encargada actualizada');
        },
        error => {
          console.error('Error al modificar Intermediario:', error);
          alert('Error al modificar Intermediario. Por favor, intenta de nuevo.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  
  modificarPersona(): void {
    if (this.formulario.valid) {
      const curp = this.formulario.get('curp')?.value; // Obtener la CURP desde el formulario
      const datosPersona = {
        curp: curp, // Incluir la CURP en los datos para buscar y actualizar
        nombre: this.formulario.get('nombre')?.value,
        paterno: this.formulario.get('apellidoPaterno')?.value,
        materno: this.formulario.get('apellidoMaterno')?.value,
        telefono: this.formulario.get('telefono')?.value,
        celular: this.formulario.get('celular')?.value,
        correo: this.formulario.get('email')?.value,
      };
  
      this.tramiteService.modificarTramite(datosPersona).subscribe(
        () => {
          alert('Persona solicitante actualizada');
        },
        error => {
          console.error('Error al modificar Persona:', error);
          alert('Error al modificar Persona. Por favor, intenta de nuevo.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  
  modificarStatus(): void {
  if (this.formulario.valid) {
    const curp = this.formulario.get('curp')?.value; // Obtener la CURP desde el formulario
    const datosStatus = {
      curp: curp, // Incluir la CURP en los datos para buscar y actualizar
      niveleducativo: this.formulario.get('nivel')?.value,
      municipio: this.formulario.get('municipio')?.value,
      tema: this.formulario.get('tema')?.value,
      status: this.formulario.get('status')?.value,
      // Agrega aquí otros campos específicos de Status que debas enviar
    };

    this.tramiteService.modificarTramite(datosStatus).subscribe(
      () => {
        alert('Tramite actualizado');
      },
      error => {
        console.error('Error al modificar Status:', error);
        alert('Error al modificar Status. Por favor, intenta de nuevo.');
      }
    );
  } else {
    alert('Por favor, completa todos los campos requeridos.');
  }
  }
}

  

