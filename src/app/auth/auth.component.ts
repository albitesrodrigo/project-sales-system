import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: false,
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  checked: boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
     private router: Router
  ) {}

  login() {
    this.router.navigate(['/inicio/clientes']);
    // this.loading = true;
    // if (!this.username || !this.password) {
    //   this.loading = false;
    //   this.messageService.add({
    //     severity: 'warn',
    //     summary: 'Campos incompletos',
    //     detail: 'Por favor, completa todos los campos.',
    //   });
    //   return;
    // }
    // const data = {
    //   username: this.username,
    //   password: this.password,
    // };

    // console.log('Datos de inicio de sesión:', data);
    // this.authService.login(data).subscribe({
    //   next: (response) => {
    //     sessionStorage.setItem('token', response.data.access_token);
    //     this.loading = false;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: response.title || 'Inicio de sesión exitoso',
    //       detail: response.message || 'Bienvenido de nuevo.',
    //     });
    //   },
    //   error: (error) => {
    //     this.loading = false;
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: error.title || 'Inicio de sesión fallido',
    //       detail: error.message || 'Por favor, verifica tus credenciales.',
    //     });
    //   },
    // });
  }
}
