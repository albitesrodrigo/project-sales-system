import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { AuthComponent } from './auth/auth.component';
import { ClientsComponent } from './modules/clients/clients.component';
import { ProductsComponent } from './modules/products/products.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'inicio',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'clientes',
        title: 'Clientes',
        component: ClientsComponent,
      },
      {
        path: 'productos',
        title: 'Productos',
        component: ProductsComponent,
      },
    ],
  },
  {
    path: '**',
    component: NoPageFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
