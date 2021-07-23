import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { BrandsComponent } from './components/brands/brands.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';
import { ProductsComponent } from './components/products/products.component';
import { SaleComponent } from './components/sale/sale.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    BrandsComponent,
    FavoritesComponent,
    HomeComponent,
    LoginComponent,
    ProductCategoriesComponent,
    ProductDetailsComponent,
    ProductImagesComponent,
    ProductsComponent,
    SaleComponent,
    SearchComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CoreModule { }
