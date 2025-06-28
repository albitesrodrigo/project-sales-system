import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { AuthComponent } from './auth/auth.component';
import { ICON_NAMES } from './constants/icons';
import { ClientsComponent } from './modules/clients/clients.component';
import { ProductsComponent } from './modules/products/products.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

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
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full'
      },
      {
        path: 'clientes',
        title: 'Clientes',
        component: ClientsComponent,
        data: {
          breadcrumb: 'Gestión de clientes',
          icon: ICON_NAMES.tractor,
        },
      },
      {
        path: 'productos',
        title: 'Productos',
        component: ProductsComponent,
        data: {
          breadcrumb: 'Gestión de productos',
          icon: ICON_NAMES.product,
        },
      },
    ]
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