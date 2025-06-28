import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import MyPreset from './mypreset';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PrimeNGModule } from './shared/primeng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { SalesModule } from './modules/sales-modules.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    PrimeNGModule,
    AuthModule,
    LayoutModule,
    SalesModule,
    HttpClientModule
  ],
  providers: [
    MessageService,
    ConfirmationService, 
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.my-app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
