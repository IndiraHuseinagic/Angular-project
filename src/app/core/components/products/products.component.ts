import { FavoritesService } from 'shared/services/favorites.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription} from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';



@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products$: Observable<Product []>;
  category: string;
  favorites: any;
  paramsSub: Subscription;
  favoritesSub: Subscription;

constructor(
    private productS: ProductService,
    private route: ActivatedRoute,
    private favoritesS: FavoritesService) {}

   async ngOnInit() {

    this.paramsSub = combineLatest([this.route.paramMap, this.route.queryParamMap])
    .subscribe(params => {
      const filters = {
        category: params[0].get('category'),
        sale: false,
        favorites: false,
        search: false,
        size:  params[1].getAll('size'),
        brand: params[1].getAll('brand'),
        color: params[1].getAll('color'),
        price: params[1].getAll('price'),
        sort:  params[1].get('sort')
      };
      this.category = params[0].get('category');
      this.products$ = this.productS.getFilteredProducts(filters);

    });
    this.favoritesSub = (await this.favoritesS.getFavorites())
        .subscribe(favorites => {this.favorites = favorites; });

   }

   ngOnDestroy() {
      this.favoritesSub.unsubscribe();
      this.paramsSub.unsubscribe();
   }

}
