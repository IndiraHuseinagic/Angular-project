import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';
import { CartProduct } from 'shared/models/cart-product';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object<ShoppingCart>('/shopping-carts/' + cartId)
    .valueChanges()
        .pipe(map((x) => (x) ? new ShoppingCart(( x as any).items) : (x as any)
  ));
  }


  async addToCart(product: Product, productId: string, selectedSize: number){
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItem(cartId, productId);
    const item$ = itemRef.valueChanges();

    item$.pipe(take(1)).subscribe(item => {
      itemRef.update({
        title: product.title,
        size: selectedSize,
        imageUrl: product.imageUrl,
        brand: product.brand,
        color: product.color,
        price: product.salePrice,
        quantity: (item?.quantity || 0) + 1});
    });
  }

 async increaseQuantity(product: Product, productId: string) {
    return this.updateQuantity(product, 1, productId);
 }

 async decreaseQuantity(product: Product, productId: string) {
    return this.updateQuantity(product, -1, productId);
 }

 async deleteQuantity(productId: string) {
    const cartId = await this.getOrCreateCartId();
    this.getItem(cartId, productId).remove();
 }

 async clearCart(){
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
 }

 // ----------------Private-------------------//
 private create() {
  return this.db.list('/shopping-carts').push({
    dateCreated: new Date().toLocaleString()
  });
 }

 private getItem(cartId: string, productId: string) {
    return this.db.object<CartProduct>('/shopping-carts/' + cartId + '/items/' + productId);
 }

 private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');

    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
 }

 private async updateQuantity(product: Product, change: number, productId: string ){
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItem(cartId, productId);
    const item$ = itemRef.valueChanges();

    item$.pipe(take(1)).subscribe(item => {
      const quantity = (item?.quantity || 0) + change;

      if (quantity === 0) { itemRef.remove(); }
      else { itemRef.update({quantity}); }
    });
  }
 }
