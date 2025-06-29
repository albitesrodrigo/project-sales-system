import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { PrimeNGModule } from '../shared/primeng.module';
import { HomeComponent } from './home/home.component';
import { SalesComponent } from './sales/sales.component';

@NgModule({
  declarations: [
    ClientsComponent,
    ProductsComponent,
    HomeComponent,
    SalesComponent,
  ],
  imports: [PrimeNGModule],
  exports: [ClientsComponent, ProductsComponent, HomeComponent, SalesComponent],
})
export class SalesModule {}
