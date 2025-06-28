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
  products: Product[] = [];
  loading: boolean = false;
  dialogVisible: boolean = false;
  isEditing: boolean = false;
  dataEdit: Product | null = null;

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.productsService.getProducts().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status === 'success') {
          this.products = response.data ?? [];
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
        this.productsService.deleteProduct(product.id).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.status === 'success') {
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

  showDialogEditProduct(product: Product) {
    this.isEditing = true;
    this.dialogVisible = true;
    this.dataEdit = product;
  }

  onProductSaved(productData: Product) {
    this.loading = true;

    if (this.isEditing) {
      this.productsService
        .updateProduct(productData.id, productData)
        .subscribe({
          next: (response) => {
            this.dialogVisible = false;
            this.loading = false;
            if (response.status === 'success') {
              this.messageService.add({
                severity: 'success',
                summary: response.title || 'Producto actualizado',
                detail:
                  response.message ||
                  'El producto se ha actualizado correctamente.',
              });
              this.fetchProducts();
            }
          },
          error: (error) => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: error.title || 'Error al actualizar producto',
              detail:
                error.message || 'Por favor, inténtalo de nuevo más tarde.',
            });
          },
        });
    } else {
      if (!productData.nombre || !productData.precio || !productData.stock) {
        this.loading = false;
        this.messageService.add({
          severity: 'warn',
          summary: 'Campos incompletos',
          detail: 'Por favor, completa todos los campos requeridos.',
        });
        return;
      }
      this.productsService.createProduct(productData).subscribe({
        next: (response) => {
          this.dialogVisible = false;
          this.loading = false;
          if (response.status === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: response.title || 'Producto creado',
              detail:
                response.message || 'El producto se ha creado correctamente.',
            });
            this.fetchProducts();
          }
        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: error.title || 'Error al crear producto',
            detail: error.message || 'Por favor, inténtalo de nuevo más tarde.',
          });
        },
      });
    }
  }
}
