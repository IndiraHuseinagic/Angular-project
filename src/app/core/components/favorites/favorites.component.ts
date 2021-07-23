import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { FavoritesService } from 'shared/services/favorites.service';


@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy{
  products$: Observable<Product []>;
  favorites: any;
  subscription: Subscription;

  constructor(private favoritesS: FavoritesService) { }

  async ngOnInit() {
    this.products$ = await this.favoritesS.getFavoriteProducts();
    this.subscription = (await this.favoritesS.getFavorites())
        .subscribe(favorites => {this.favorites = favorites; });
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }
}








