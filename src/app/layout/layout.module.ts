import { NgModule } from '@angular/core';
import { PrimeNGModule } from '../shared/primeng.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [PrimeNGModule],
})
export class LayoutModule {}
