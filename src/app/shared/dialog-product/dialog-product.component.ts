import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.scss',
  standalone: false,
})
export class DialogProductComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() productData: any;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() productSaved = new EventEmitter<any>();

  ngOnChanges(): void {
    this.loadData();
  }

  loadData() {
    if (this.isEdit && this.productData) {
      this.productData = {
        id: this.productData.id,
        nombre: this.productData.nombre,
        precio: this.productData.precio,
        stock: this.productData.stock,
      };
    } else {
      this.cleanForm();
    }
  }

  cleanForm() {
    this.productData = {
      nombre: '',
      precio: 0.0,
      stock: 0,
    };
  }

  onSave() {
    if (this.isEdit && this.productData) {
      this.productSaved.emit({
        id: this.productData.id,
        nombre: this.productData.nombre,
        precio: this.productData.precio,
        stock: this.productData.stock,
      });
    } else {
      this.productSaved.emit(this.productData);
    }
  }
  onCancel() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
