import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { PrimeNGModule } from '../shared/primeng.module';

@NgModule({
  declarations: [ClientsComponent, ProductsComponent],
  imports: [PrimeNGModule],
  exports: [ClientsComponent, ProductsComponent],
})
export class SalesModule {}