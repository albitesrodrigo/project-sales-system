import { Component, OnInit } from '@angular/core';
import { COLS_CLIENTES } from '../../data/headers';
import { CLIENTES } from '../../utils/mock-data';
import { ClientsService } from './service/clients.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from '../../model/clients.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  standalone: false,
})
export class ClientsComponent implements OnInit {
  constructor(
    private clientsService: ClientsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  columns = COLS_CLIENTES;
  clientes = CLIENTES;
  clients: Client[] = [];
  nameClient: string = '';
  loading: boolean = false;
  dialogVisible: boolean = false;
  isEditing: boolean = false;

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.loading = true;
    this.clientsService.getClients(this.nameClient).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status) {
          this.clients = response.data ?? [];
          this.messageService.add({
            severity: 'success',
            summary: response.title || 'Clientes cargados',
            detail:
              response.message || 'Los clientes se han cargado correctamente.',
          });
        }
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: error.title || 'Error al cargar clientes',
          detail: error.message || 'Por favor, inténtalo de nuevo más tarde.',
        });
      },
    });
  }

  trashClient(client: any, event: Event) {
    console.log('Deleting client:', client);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres eliminar a ${client.nombre} ${client.apellido}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      acceptLabel: 'Eliminar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },
      accept: () => {
        this.loading = true;
        this.clientsService.deleteClient(client.telefono).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.status) {
              this.messageService.add({
                severity: 'success',
                summary: response.title || 'Cliente eliminado',
                detail:
                  response.message ||
                  'El cliente se ha eliminado correctamente.',
              });
            }
            this.fetchClients();
          },
          error: (error) => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: error.title || 'Error al eliminar cliente',
              detail:
                error.message || 'Por favor, inténtalo de nuevo más tarde.',
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Eliminación cancelada',
          
        });
      },
    });
  }

  showDialogCreateClient() {
    this.isEditing = false;
    this.dialogVisible = true;
  }

  showDialogEditClient() {
    this.isEditing = true;
    this.dialogVisible = true;
  }
}
