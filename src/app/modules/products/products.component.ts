import { Component, OnInit } from '@angular/core';
import { COLS_PRODUCTOS } from '../../data/headers';
import { PRODUCTOS } from '../../utils/mock-data';
import { ClientsService } from '../clients/service/clients.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../../model/products.model';
import { ProductsService } from './service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: false,
})
export class ProductsComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  columns = COLS_PRODUCTOS;
  productos = PRODUCTOS;
  products: Product[] = [];
  nameProduct: string = '';
  loading: boolean = false;
  dialogVisible: boolean = false;
  isEditing: boolean = false;

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.productsService.getProducts(this.nameProduct).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status) {
          this.products = response.data ?? [];
          this.messageService.add({
            severity: 'success',
            summary: response.title || 'Productos cargados',
            detail:
              response.message || 'Los productos se han cargado correctamente.',
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

  trashProduct(product: any, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres eliminar a ${product.nombre}?`,
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
        this.productsService.deleteProduct(product.telefono).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.status) {
              this.messageService.add({
                severity: 'success',
                summary: response.title || 'Producto eliminado',
                detail:
                  response.message ||
                  'El producto se ha eliminado correctamente.',
              });
            }
            this.fetchProducts();
          },
          error: (error) => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: error.title || 'Error al eliminar producto',
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

  showDialogCreateProduct() {
    this.isEditing = false;
    this.dialogVisible = true;
  }

  showDialogEditProduct() {
    this.isEditing = true;
    this.dialogVisible = true;
  }
}
