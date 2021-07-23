import { FavoritesService } from 'shared/services/favorites.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit  {
appUser: AppUser;
cart$: Observable<ShoppingCart>;
favorites$: Observable<Product[]>;
closeResult = '';

constructor(
    private authS: AuthService,
    private cartS: ShoppingCartService,
    private favoritesS: FavoritesService,
    private router: Router) {}

 async ngOnInit(){
    this.authS.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartS.getCart();
    this.favorites$ = await this.favoritesS.getFavoriteProducts();
 }

 // Search
 searchNavigate(searchText: string) {
    if (searchText) {
      this.router.navigate(['search'],
      {queryParams: {search: searchText}});
    }
 }

 // Logout
 logout() {
  this.authS.logout();
 }

 // Modal
 openModal(){
  const modalF  = document.getElementById('modal-navigation');
  modalF.classList.remove('d-none');
  modalF.classList.add('d-block');
 }

 closeModal() {
  const modalF  = document.getElementById('modal-navigation');
  modalF.classList.remove('d-block');
  modalF.classList.add('d-none');
 }

}

