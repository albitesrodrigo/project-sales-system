import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrl: './dialog-client.component.scss',
  standalone: false,
})
export class DialogClientComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() clientData: any;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() clientSaved = new EventEmitter<any>();

  ngOnChanges(): void {
    this.loadData();
  }

  loadData() {
    if (this.isEdit && this.clientData) {
      this.clientData = {
        id: this.clientData.id,
        nombre: this.clientData.nombre,
        apellido: this.clientData.apellido,
        correo: this.clientData.correo,
        telefono: this.clientData.telefono,
        dni: this.clientData.dni,
      };
    } else {
      this.cleanForm();
    }
  }

  cleanForm() {
    this.clientData = {
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      dni: '',
    };
  }

  onSave() {
    if (this.isEdit && this.clientData) {
      this.clientSaved.emit({
        id: this.clientData.id,
        nombre: this.clientData.nombre,
        apellido: this.clientData.apellido,
        correo: this.clientData.correo,
        telefono: this.clientData.telefono,
        dni: this.clientData.dni,
      });
    } else {
      this.clientSaved.emit(this.clientData);
    }
  }

    onCancel() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
