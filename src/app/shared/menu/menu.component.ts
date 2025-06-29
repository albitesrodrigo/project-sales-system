import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Menu } from '../../model/menu.model';
import { HttpClient } from '@angular/common/http';
import { NotificacionService } from './service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: false,
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  user: any;
  notificacionesNoVistas: number = 0;
  mostrarPanel: boolean = false;
  notificaciones: any[] = [];

selectedNotificacion: any = null;
mostrarDialogo: boolean = false;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient,private notificacionService: NotificacionService) {}

  ngOnInit() {
    this.getMenu();
    this.getToken();
    this.obtenerNotificacionesNoVistas();
    this.obtenerNotificaciones();

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
        console.error('Error cargando menús:', err);
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

obtenerNotificacionesNoVistas(): void {
  this.notificacionService.getNotificacionesNoVistasCount().subscribe({
    next: (resp) => {
      this.notificacionesNoVistas = resp.data || 0;
    },
    error: (err) => {
      console.error('Error al obtener notificaciones:', err);
    },
  });
}

obtenerNotificaciones(): void {
  this.notificacionService.getNotificaciones().subscribe({
    next: (resp) => {
      this.notificaciones = resp.data || [];
    },
    error: (err) => {
      console.error('Error al obtener notificaciones:', err);
    },
  });
}

marcarComoVista(id: number): void {
  this.notificacionService.marcarComoVista(id).subscribe({
    next: () => {
      this.obtenerNotificaciones();
      this.obtenerNotificacionesNoVistas();
    },
    error: (err) => {
      console.error('Error al marcar notificación como vista:', err);
    },
  });
}



    togglePanel(): void {
    this.mostrarPanel = !this.mostrarPanel;
    if (this.mostrarPanel) {
      this.obtenerNotificaciones();
    }
  }



ventaSeleccionada: any = null;


abrirDetalle(notif: any): void {
  this.selectedNotificacion = notif;
  this.mostrarDialogo = true;

  if (notif.visto === 'No') {
    this.marcarComoVista(notif.id);
  }

  // Cargar venta
  this.notificacionService.getVentaPorNro(notif.nroventa).subscribe({
    next: (resp) => {
      this.ventaSeleccionada = resp.data;
    },
    error: (err) => {
      console.error('Error al obtener venta:', err);
    }
  });
}


}
