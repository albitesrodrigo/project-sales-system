import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.scss',
  standalone: false,
})
export class DialogProductComponent {
  @Input() visible: boolean = false;
  @Input() isEdit: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  onSave() {
    console.log('Product data saved');
    this.visible = false;
  }

    onCancel() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
