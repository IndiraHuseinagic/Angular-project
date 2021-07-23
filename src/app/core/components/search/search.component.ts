import { FavoritesService } from 'shared/services/favorites.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  products$: Observable<Product []>;
  favorites: any;
  subscription: Subscription;

  constructor(
    private productS: ProductService,
    private route: ActivatedRoute,
    private favoritesS: FavoritesService) {}

  async ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      const filters = {
        category: false,
        sale: false,
        favorites: false,
        search: params.get('search'),
        size:  params.getAll('size'),
        brand: params.getAll('brand'),
        color: params.getAll('color'),
        price: params.getAll('price'),
        sort:  params.get('sort')
      };
      this.products$ = this.productS.getFilteredProducts(filters);
    });

    this.subscription = (await this.favoritesS.getFavorites())
        .subscribe(favorites => {this.favorites = favorites; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}



}

