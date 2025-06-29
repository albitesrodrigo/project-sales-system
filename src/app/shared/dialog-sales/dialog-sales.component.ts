import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../model/clients.model';
import { Product } from '../../model/products.model';

@Component({
  selector: 'app-dialog-sales',
  templateUrl: './dialog-sales.component.html',
  styleUrl: './dialog-sales.component.scss',
  standalone: false,
})
export class DialogSalesComponent {
  @Input() visible: boolean = false;
  @Input() clients: Client[] = [];
  @Input() products: Product[] = [];
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() salesSaved = new EventEmitter<any[]>();

  salesData: any = {};
  selectClient: any;
  selectProductIds: number[] = [];
  selectProduct: any[] = [];
  totalAmount: number = 0;

  cleanForm() {
    this.salesData = [];
    this.selectClient = null;
    this.selectProductIds = [];
    this.selectProduct = [];
    this.totalAmount = 0;
  }

  onSave() {
    this.salesData = this.selectProduct.map((prod) => ({
      producto: { id: prod.id },
      cantidad: prod.cantidad,
    }));
    (this.salesData = {
      cliente: { id: this.selectClient.id },
      detalles: this.salesData,
    }),
      this.salesSaved.emit(this.salesData);
  }

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.cleanForm();
  }
  onProductSelect(event: any) {
    // Fuerza los IDs a tipo number
    this.selectProductIds = (event.value as any[]).map((id) => +id);
    this.selectProduct = this.products
      .filter((prod) => this.selectProductIds.includes(Number(prod.id)))
      .map((prod) => {
        const existing = this.selectProduct.find((p) => p.id === prod.id);
        return {
          ...prod,
          cantidad: existing ? existing.cantidad : 1,
        };
      });
    this.updateTotal();
  }

  addQuantity(product: any) {
    product.cantidad++;
    this.updateTotal();
  }

  removeQuantity(product: any) {
    if (product.cantidad > 1) {
      product.cantidad--;
      this.updateTotal();
    } else {
      this.selectProduct = this.selectProduct.filter(
        (p) => p.id !== product.id
      );
      this.updateTotal();
    }
  }

  updateTotal() {
    this.totalAmount = this.selectProduct.reduce(
      (acc, prod) => acc + prod.precio * prod.cantidad,
      0
    );
  }
}
