import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false,
})
export class HomeComponent implements OnInit {
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef, private router: Router) {}

  // Métodos de navegación
  navigateToSales() {
    this.router.navigate(['/inicio/ventas']);
  }

  navigateToClients() {
    this.router.navigate(['/inicio/clientes']);
  }

  navigateToProducts() {
    this.router.navigate(['/inicio/productos']);
  }

  navigateViewSales() {
    this.router.navigate(['/inicio/ver-ventas']);
  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor =
        documentStyle.getPropertyValue('--p-text-color') || '#000';
      const textColorSecondary =
        documentStyle.getPropertyValue('--p-text-muted-color') || '#666';
      const surfaceBorder =
        documentStyle.getPropertyValue('--p-content-border-color') || '#e5e7eb';

      this.data = {
        labels: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
        ],
        datasets: [
          {
            label: 'Ventas',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            tension: 0.4,
            borderColor: '#06b6d4',
          },
          {
            label: 'Productos',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderDash: [5, 5],
            tension: 0.4,
            borderColor: '#f97316',
          },
          {
            label: 'Clientes',
            data: [12, 51, 62, 33, 21, 62, 45],
            fill: true,
            borderColor: '#6b7280',
            tension: 0.4,
            backgroundColor: 'rgba(107, 114, 128, 0.2)',
          },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }
}
