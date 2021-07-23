import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(private db: AngularFireDatabase) {}

 isFavorite(favorites: any, productId: string) {
   if (favorites && favorites.items && favorites.items[productId]) {
     return true;
    }
   return false;
 }

 async getFavoriteProducts() {
  const favoriteId = await this.getOrCreateFavoriteId();
  return this.db.list('/favorites/' + favoriteId + '/items').snapshotChanges()
  .pipe(map(actions =>
      actions.map(a => ({ key: a.key, ...a.payload.val() as Product })) ));
 }

 async getFavorites() {
    const favoriteId = await this.getOrCreateFavoriteId();
    return this.db.object('/favorites/' + favoriteId).valueChanges();
 }

 async addRemoveFavorites(product: Product) {
    const favoriteId = await this.getOrCreateFavoriteId();
    const itemRef =  this.getItem(favoriteId, product.key);
    const item$ = itemRef.valueChanges();

    item$.pipe(take(1)).subscribe(item => {
      if (item)  { itemRef.remove(); }
      else { itemRef.update({
        title: product.title,
        imageUrl: product.imageUrl,
        brand: product.brand,
        price: product.price,
        salePrice: product.salePrice
      }); }
    });
}

 // ----------------Private-------------------//
private create() {
  return this.db.list('/favorites').push({
    dateCreated: new Date().toLocaleString()
  });
}

private getItem(favoriteId: string, productId: string) {
  return this.db.object('/favorites/' + favoriteId + '/items/' + productId);
}

private async getOrCreateFavoriteId() {
    const favoriteId = localStorage.getItem('favoriteId');

    if (favoriteId) { return favoriteId; }

    const result = await this.create();
    localStorage.setItem('favoriteId', result.key);
    return result.key;
 }

}
