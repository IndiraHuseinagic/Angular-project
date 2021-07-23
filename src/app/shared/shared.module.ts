import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { BackButtonDirective } from './directives/back-button.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'app/app-routing.module';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { FavoritesService } from './services/favorites.service';
import { NavigationService } from './services/navigation.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { SharedDataService } from './services/shared-data.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductFilterComponent,
    BackButtonDirective
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    AppRoutingModule
  ],

  exports: [
    ProductCardComponent,
    ProductFilterComponent,
    BackButtonDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    AppRoutingModule
  ],

  providers: [
    AuthGuard,
    AuthService,
    CategoryService,
    FavoritesService,
    NavigationService,
    OrderService,
    ProductService,
    SharedDataService,
    ShoppingCartService,
    UserService
  ]

})
export class SharedModule { }
