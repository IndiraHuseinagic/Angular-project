import { FavoritesService } from 'shared/services/favorites.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit, OnDestroy {
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
        sale: true,
        favorites: false,
        search: false,
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
