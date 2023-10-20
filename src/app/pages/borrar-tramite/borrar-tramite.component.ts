// borrar-tramite.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-borrar-tramite',
  templateUrl: './borrar-tramite.component.html',
  styleUrls: ['./borrar-tramite.component.css']
})
export class BorrarTramiteComponent implements OnInit {
  formulario: FormGroup;
  mensaje: string | null = null;

  constructor(private fb: FormBuilder, private tramiteService: TramiteService) {
    this.formulario = this.fb.group({
      curp: ['']
    });
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      curp: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const curp = this.formulario.get('curp')?.value;
      this.tramiteService.borrarTramite(curp).subscribe(
        () => {
          this.mensaje = 'Trámite borrado correctamente';
        },
        error => {
          console.error('Error:', error);
          this.mensaje = 'Hubo un error al borrar el trámite';
        }
      );
    }
  }
}
