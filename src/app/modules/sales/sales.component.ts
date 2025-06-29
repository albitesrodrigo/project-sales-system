import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from './service/sales.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { COLS_VENTAS } from '../../data/headers';
import { Sale } from '../../model/sales.model';
import { ClientsService } from '../clients/service/clients.service';
import { Client } from '../../model/clients.model';
import { ProductsService } from '../products/service/products.service';
import { Product } from '../../model/products.model';
import { DialogSalesComponent } from '../../shared/dialog-sales/dialog-sales.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
  standalone: false,
})
export class SalesComponent implements OnInit {
  @ViewChild(DialogSalesComponent) dialogSalesComponent!: DialogSalesComponent;

  constructor(
    private salesService: SalesService,
    private messageService: MessageService,
    private clientsService: ClientsService,
    private productsService: ProductsService
  ) {}
  columns = COLS_VENTAS;
  sales: Sale[] = [];
  clients: Client[] = [];
  products: Product[] = [];
  loading: boolean = false;
  dialogVisible: boolean = false;

  ngOnInit(): void {
    this.fetchSales();
    this.fetchClients();
    this.fetchProducts();
  }

  fetchSales() {
    this.loading = true;
    this.salesService.getSales().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status === 'success') {
          this.sales = response.data ?? [];
        } else if (response.status === 'error') {
          this.messageService.add({
            severity: 'error',
            summary: response.title || 'Error al cargar ventas',
            detail:
              response.message || 'Por favor, inténtalo de nuevo más tarde.',
          });
        }
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: error.title || 'Error al cargar ventas',
          detail: error.message || 'Por favor, inténtalo de nuevo más tarde.',
        });
      },
    });
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

  fetchProducts() {
    this.loading = true;
    this.productsService.getProducts().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status === 'success') {
          this.products = response.data ?? [];
        } else if (response.status === 'error') {
          this.messageService.add({
            severity: 'error',
            summary: response.title || 'Error al cargar productos',
            detail:
              response.message || 'Por favor, inténtalo de nuevo más tarde.',
          });
        }
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: error.title || 'Error al cargar productos',
          detail: error.message || 'Por favor, inténtalo de nuevo más tarde.',
        });
      },
    });
  }
  showDialogCreateSales() {
    this.dialogVisible = true;
  }

  filterGlobal(table: any, event: Event) {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }

  onSalesSaved(salesData: any) {
    this.loading = true;
    this.salesService.createSales(salesData).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.loading = false;
          this.dialogVisible = false;
          this.dialogSalesComponent.cleanForm();
          this.messageService.add({
            severity: 'success',
            summary: response.title || 'Venta creada',
            detail: response.message || 'La venta se ha creado correctamente.',
          });
          this.fetchSales();
        } else if (response.status === 'error') {
          this.messageService.add({
            severity: 'error',
            summary: response.title || 'Error al crear venta',
            detail:
              response.message || 'Por favor, inténtalo de nuevo más tarde.',
          });
        }
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: error.title || 'Error al crear venta',
          detail: error.message || 'Por favor, inténtalo de nuevo más tarde.',
        });
      },
    });
  }
}
