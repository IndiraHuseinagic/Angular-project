import { ProductDetailsComponent } from './core/components/product-details/product-details.component';
import { SaleComponent } from './core/components/sale/sale.component';
import { HomeComponent } from './core/components/home/home.component';
import { FavoritesComponent } from './core/components/favorites/favorites.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './core/components/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { SearchComponent } from './core/components/search/search.component';
import { BrandsComponent } from './core/components/brands/brands.component';
import { PaymentComponent } from './shopping/components/payment/payment.component';
import { CheckOutSummaryComponent } from './shopping/components/check-out-summary/check-out-summary.component';
import { ShippingFormComponent } from './shopping/components/shipping-form/shipping-form.component';
import { OrderDetailsComponent } from './shopping/components/order-details/order-details.component';
import { BasicLayoutComponent } from './layouts/components/basic-layout/basic-layout.component';
import { OrderLayoutComponent } from './layouts/components/order-layout/order-layout.component';


const routes: Routes = [

  // Basic layout routes
  {
   path: '',
   component: BasicLayoutComponent,
   children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'sale', component: SaleComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'category/:category', component: ProductsComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'my/orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ]
   },

  // Order layout routes
  {
    path: 'check-out',
    component: OrderLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'shipping', pathMatch: 'full'},
      {path: 'shipping', component: ShippingFormComponent, },
      {path: 'payment', component: PaymentComponent},
      {path: 'summary', component: CheckOutSummaryComponent}
    ]
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
