import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { FavoritesService } from 'shared/services/favorites.service';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input() product: Product;
  @Input() favorites: any;

  constructor(private favoritesS: FavoritesService) { }

  async addRemoveFavorites(){
    this.favoritesS.addRemoveFavorites(this.product);
  }

  isFavorite() {
   return this.favoritesS.isFavorite(this.favorites, this.product.key);
  }


}
