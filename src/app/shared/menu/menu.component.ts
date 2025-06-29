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
  user: any;

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
    this.getMenu();
    this.getToken();
  }
  
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    this.router.navigate(['/login']);
  }

  getMenu() {
    this.authService.getMenus().subscribe({
      next: (response) => {
        const menuList: Menu[] = response.data;

        this.items = [
          {
            label: 'Sistema de Gestión de Ventas',
            icon: 'pi pi-cog',
            items: menuList?.map((menu) => ({
              label: menu.nombre,
              icon: menu.icono || 'pi pi-circle', // ícono por defecto si no hay
              command: () => this.router.navigate([menu.url]),
            })),
          },
        ];
      },
      error: (err) => {
        console.error('❌ Error cargando menús:', err);
      },
    });
  }

  getToken() {
    const token = localStorage.getItem('primeLandAuthToken');
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken) {
        localStorage.setItem('user', JSON.stringify(decodedToken));
        this.user = decodedToken;
        return token;
      }
    }
    return null;
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      console.error('Token inválido');
      return null;
    }
  }
}
