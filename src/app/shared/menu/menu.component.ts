import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Menu } from '../../model/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: false,
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private authService: AuthService, private router: Router) {}
/*
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
*/
  ngOnInit() {
    this.authService.getMenus().subscribe({
      next: (response) => {
        const menuList: Menu[] = response.data;

        this.items = [
          {
            label: 'Sistema de Gestión de Ventas',
            icon: 'pi pi-cog',
            items: menuList.map((menu) => ({
              label: menu.nombre,
              icon: menu.icono || 'pi pi-circle', // ícono por defecto si no hay
              command: () => this.router.navigate([menu.url])
            }))
          }
        ];
      },
      error: (err) => {
        console.error('❌ Error cargando menús:', err);
      }
    });
  }
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
