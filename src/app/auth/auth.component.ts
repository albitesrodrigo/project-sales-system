import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: false,
})
export class AuthComponent {
  username: string = 'admin';
  password: string = 'admin123';
  rememberMe: boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  login(): void {
    if (!this.username || !this.password) {
      this.showError('Campos requeridos', 'Usuario y contraseña son obligatorios');
      return;
    }

    this.loading = true;

    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {

        this.router.navigate(['/inicio/home']);

      },
      error: (error) => {
        this.loading = false;
        const message = error.status === 401
          ? 'Credenciales incorrectas'
          : 'Error al iniciar sesión. Intente nuevamente.';
        this.showError('Error', message);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private showError(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: 5000
    });
  }
}
