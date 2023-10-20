import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TramiteService } from '../../services/tramite.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as QRCode from 'qrcode';


//function validarCURP(control: AbstractControl): ValidationErrors | null {
  //const curpRegex = /^[A-Z]{4}\d{6}[HM]\w{2}[A-Z]{4}\d{2}$/;
  //const valor = control.value;
  //const esValido = curpRegex.test(valor);
  //return esValido ? null : { curpInvalido: true };
//}


@Component({
  selector: 'app-consultar-tramite',
  templateUrl: './consultar-tramite.component.html',
  styleUrls: ['./consultar-tramite.component.css']
})
export class ConsultarTramiteComponent implements OnInit {
  formulario: FormGroup;
  tramiteData: any;
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
      this.tramiteService.consultarTramite(curp).subscribe(
        data => {
          console.log('Datos del trámite:', data);
          if (data.length === 0) {
            this.mensaje = 'No hay trámites registrados con esta CURP.';  // Añade esta línea
          } else {
            this.tramiteData = data[0];
            this.mensaje = null;  // Añade esta línea
          }
        },
        error => {
          console.error('Error:', error);
          this.mensaje = 'Hubo un error al obtener los datos.';  // Añade esta línea
        }
      );
    }
  }

  generatePDF(): void {
    const doc = new jsPDF({ orientation: 'landscape' }); // Cambia la orientación a horizontal

    const header = [
      'ID Trámite',
      'Intermediario',
      'Nombre',
      'CURP',
      'Teléfono',
      'Celular',
      'Email',
      'Nivel Educativo',
      'Municipio',
      'Tema',
      'Estatus'
    ];

    const tramite = this.tramiteData;
    const data = [[
      tramite.tramite_id,
      tramite.nombreCompleto,
      `${tramite.nombre} ${tramite.paterno} ${tramite.materno}`,
      tramite.curp,
      tramite.telefono,
      tramite.celular,
      tramite.correo,
      tramite.nivelEducativo,
      tramite.municipio,
      tramite.tema,
      tramite.status  // Asegúrate de que esta es la propiedad correcta para el estatus
    ]];

    const fechaActual = new Date();
    const fechaGeneracion = fechaActual.toLocaleDateString();
    doc.text(`Fecha de Generación: ${fechaGeneracion}`, 14, 10); // Agrega la fecha al PDF

    doc.text('Datos del Trámite', 14, 20);  // Título del PDF
    autoTable(doc, { head: [header], body: data, startY: 30 });  // Genera la tabla

    // Genera el código QR
    QRCode.toDataURL(tramite.curp, { errorCorrectionLevel: 'H' }, (err, url) => {
      if (err) {
        console.error('Error al generar el código QR:', err);
      } else {
        const img = new Image();
        img.src = url;

        // Agrega el código QR al PDF
        doc.addImage(img, 'PNG', 160, 50, 30, 30);

        // Guarda el PDF después de agregar el código QR
        doc.save(tramite.curp+'_tramite.pdf');
      }
    });
  }


}
