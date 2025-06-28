import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { PrimeNGModule } from '../shared/primeng.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [ClientsComponent, ProductsComponent, HomeComponent],
  imports: [PrimeNGModule],
  exports: [ClientsComponent, ProductsComponent, HomeComponent],
})
export class SalesModule {}
