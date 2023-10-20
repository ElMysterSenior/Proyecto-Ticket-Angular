import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-data-analytics2',
  templateUrl: './data-analytics2.component.html',
  styleUrls: ['./data-analytics2.component.css']
})
export class DataAnalytics2Component implements OnInit {

  @ViewChild('chart', { static: true }) private chartRef!: ElementRef;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.loadTramitesPorTemaChart();
  }

  private loadTramitesPorTemaChart(): void {
    this.analyticsService.getTramitesPorTema().subscribe((data: any[]) => {
      this.createBarChartForTema(data);
    });
  }

  private createBarChartForTema(data: any[]): void {
    const labels = data.map(item => item.descripcion);  // Asume que 'tema' es la propiedad con los nombres
    const values = data.map(item => item.cantidad);

    const ctx = this.chartRef.nativeElement.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Trámites por Tema',
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
