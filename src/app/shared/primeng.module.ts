import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MenuComponent } from './menu/menu.component';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog'; 
import { DialogClientComponent } from './dialog-client/dialog-client.component';
import { DialogProductComponent } from './dialog-product/dialog-product.component';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogSalesComponent } from './dialog-sales/dialog-sales.component';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    LoadingSpinnerComponent, 
    MenuComponent, 
    DialogClientComponent,
    DialogProductComponent,
    DialogSalesComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RippleModule,
    ToastModule,
    ProgressSpinnerModule,
    MenuModule,
    BadgeModule,
    AvatarModule,
    TableModule,
    PaginatorModule,
    ConfirmDialogModule,
    DialogModule,
    ChartModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
    MultiSelectModule
  ],
  exports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RippleModule,
    ToastModule,
    MenuModule,
    BadgeModule,
    AvatarModule,
    ProgressSpinnerModule,
    LoadingSpinnerComponent,
    MenuComponent,
    TableModule,
    PaginatorModule,
    ConfirmDialogModule, 
    DialogModule,
    ChartModule,
    DialogClientComponent,
    DialogProductComponent,
    DialogSalesComponent,
    TagModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
    MultiSelectModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class PrimeNGModule {}