import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-data-analytics3',
  templateUrl: './data-analytics3.component.html',
  styleUrls: ['./data-analytics3.component.css']
})
export class DataAnalytics3Component implements OnInit {

  @ViewChild('chart', { static: true }) private chartRef!: ElementRef;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.loadTramitesPorNivelEducativoChart();
  }

  private loadTramitesPorNivelEducativoChart(): void {
    this.analyticsService.getCantidadTramitesPorNivelEducativo().subscribe((data: any[]) => {
      this.createBarChartForNivelEducativo(data);
    });
  }

  private createBarChartForNivelEducativo(data: any[]): void {
    const labels = data.map(item => item.nivel);  // Asume que 'nivelEducativo' es la propiedad con los nombres
    const values = data.map(item => item.cantidad);

    const ctx = this.chartRef.nativeElement.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Trámites por Nivel Educativo',
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
