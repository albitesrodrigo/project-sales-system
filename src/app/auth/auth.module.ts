import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { PrimeNGModule } from '../shared/primeng.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [PrimeNGModule],
})
export class AuthModule {}
