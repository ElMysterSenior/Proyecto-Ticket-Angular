import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-data-analytics4',
  templateUrl: './data-analytics4.component.html',
  styleUrls: ['./data-analytics4.component.css']
})
export class DataAnalytics4Component implements OnInit {

  @ViewChild('chart', { static: true }) private chartRef!: ElementRef;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.loadTramitesPorMunicipioChart();
  }

  private loadTramitesPorMunicipioChart(): void {
    this.analyticsService.getCantidadTramitesPorMunicipio().subscribe((data: any[]) => {
      this.createBarChartForMunicipio(data);
    });
  }

  private createBarChartForMunicipio(data: any[]): void {
    const labels = data.map(item => item.nombre);  // Asume que 'municipio' es la propiedad con los nombres
    const values = data.map(item => item.cantidad);

    const ctx = this.chartRef.nativeElement.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Trámites por Municipio',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
