import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';


@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input() product: Product;
  @Input () shoppingCart: ShoppingCart;

  constructor(private cartS: ShoppingCartService) { }

  increaseQuantity() {
   this.cartS.increaseQuantity(this.product, this.product.key);
  }

  decreaseQuantity() {
    this.cartS.decreaseQuantity(this.product, this.product.key);
  }

  deleteQuantity() {
    this.cartS.deleteQuantity(this.product.key);
  }

}
