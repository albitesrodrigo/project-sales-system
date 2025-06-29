import { Component, OnInit } from '@angular/core';
import { COLS_CLIENTES } from '../../data/headers';
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
  clients: Client[] = [];
  loading: boolean = false;
  dialogVisible: boolean = false;
  isEditing: boolean = false;
  dataEdit: Client | null = null;

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.loading = true;
    this.clientsService.getClients().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status === 'success') {
          this.clients = response.data ?? [];
        } else if (response.status === 'error') {
          this.messageService.add({
            severity: 'error',
            summary: response.title || 'Error al cargar clientes',
            detail:
              response.message || 'Por favor, inténtalo de nuevo más tarde.',
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
        this.clientsService.deleteClient(client.id).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.status === 'success') {
              this.messageService.add({
                severity: 'success',
                summary: response.title || 'Cliente eliminado',
                detail:
                  response.message ||
                  'El cliente se ha eliminado correctamente.',
              });
              this.fetchClients();
            } else if (response.status === 'error') {
              this.messageService.add({
                severity: 'error',
                summary: response.title || 'Error al eliminar cliente',
                detail:
                  response.message ||
                  'Por favor, inténtalo de nuevo más tarde.',
              });
            }
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

  showDialogEditClient(client: Client) {
    this.isEditing = true;
    this.dialogVisible = true;
    this.dataEdit = client;
  }

  onClientSaved(clientData: Client) {
    this.loading = true;
    clientData = {
      id: clientData.id,
      nombre: clientData.nombre.trim(),
      apellido: clientData.apellido.trim(),
      correo: clientData.correo.trim(),
      telefono: clientData.telefono.trim(),
      dni: clientData.dni.trim(),
    };
    if (this.isEditing && this.dataEdit) {
      this.clientsService.updateClient(this.dataEdit.id, clientData).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.status === 'success') {
            this.dialogVisible = false;
            this.messageService.add({
              severity: 'success',
              summary: response.title || 'Cliente actualizado',
              detail:
                response.message ||
                'El cliente se ha actualizado correctamente.',
            });
            this.fetchClients();
          } else if (response.status === 'error') {
            this.messageService.add({
              severity: 'error',
              summary: response.title || 'Error al actualizar cliente',
              detail:
                response.message || 'Por favor, inténtalo de nuevo más tarde.',
            });
          }
        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: error.title || 'Error al actualizar cliente',
            detail: error.message || 'Por favor, inténtalo de nuevo más tarde.',
          });
        },
      });
    } else {
      if (
        !clientData.nombre ||
        !clientData.apellido ||
        !clientData.telefono ||
        !clientData.correo ||
        !clientData.dni
      ) {
        this.loading = false;
        this.messageService.add({
          severity: 'warn',
          summary: 'Campos incompletos',
          detail: 'Por favor, completa todos los campos requeridos.',
        });
        return;
      }
      this.clientsService.createClient(clientData).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.status === 'success') {
            this.dialogVisible = false;
            this.messageService.add({
              severity: 'success',
              summary: response.title || 'Cliente creado',
              detail:
                response.message || 'El cliente se ha creado correctamente.',
            });
            this.fetchClients();
          } else if (response.status === 'error') {
            this.messageService.add({
              severity: 'error',
              summary: response.title || 'Error al crear cliente',
              detail:
                response.message || 'Por favor, inténtalo de nuevo más tarde.',
            });
          }
        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: error.title || 'Error al crear cliente',
            detail: error.message || 'Por favor, inténtalo de nuevo más tarde.',
          });
        },
      });
    }
  }

  filterGlobal(table: any, event: Event) {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }
}
