// data-analytics.component.ts

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-data-analytics',
  templateUrl: './data-analytics.component.html',
  styleUrls: ['./data-analytics.component.css']
})
export class DataAnalyticsComponent implements OnInit {

  @ViewChild('chart', { static: true }) private chartRef!: ElementRef;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.loadTramitesPorEstadoChart();
  }

  private loadTramitesPorEstadoChart(): void {
    this.analyticsService.getTramitesPorEstado().subscribe((data: any[]) => {
      this.createBarChart(data);
    });
  }

  private createBarChart(data: any[]): void {
    const labels = data.map(item => item.status);
    const values = data.map(item => item.cantidad);

    const ctx = this.chartRef.nativeElement.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Trámites por Estado',
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
