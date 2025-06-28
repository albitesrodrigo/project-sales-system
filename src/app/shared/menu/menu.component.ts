import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: false,
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Sistema de Gestión de Ventas',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Clientes',
            icon: 'pi pi-users',
            command: () => this.router.navigate(['/inicio/clientes'])
          },
          {
            label: 'Productos',
            icon: 'pi pi-box',
            command: () => this.router.navigate(['/inicio/productos'])
          }
        ]
      }
    ];
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}