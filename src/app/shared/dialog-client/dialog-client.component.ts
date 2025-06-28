import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrl: './dialog-client.component.scss',
  standalone: false,
})
export class DialogClientComponent {
  @Input() visible: boolean = false;
  @Input() isEdit: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  onSave() {
    console.log('Client data saved');
    this.visible = false;
  }

    onCancel() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
