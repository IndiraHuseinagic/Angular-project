import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll(){
     return this.db.list('/products').snapshotChanges()
    .pipe(map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() as Product })) ));
  }


  getFilteredProducts(filters: any) {
    const prices = this.getPrices();

    return this.getAll()
       .pipe(map(products => {
        let filteredProducts: any;

        // category
        if (filters.category) {
        filteredProducts = products
        .filter(product => (!filters.category.length || filters.category === product.category));
        }

        // sale
        if (filters.sale) {
        filteredProducts = products
        .filter(product => (product.price !== product.salePrice));
        }

        // search
        if (filters.search) {
          filteredProducts = products
          .filter(product => (product.title.toLowerCase().includes(filters.search.toLowerCase())));
        }

        // filter
        filteredProducts = filteredProducts
           .filter(product => (!filters.size.length ||
                          filters.size.some(size => this.between(size, product.minSize, product.maxSize))))
           .filter(product => (!filters.color.length || filters.color.includes(product.color)))
           .filter(product => (!filters.brand.length || filters.brand.includes(product.brand)))
           .filter(product => (!filters.price.length ||
                          filters.price.some(price =>
                            this.between(product.salePrice, prices[price].min, prices[price].max))));

        // sort
        filteredProducts = this.sorting(filteredProducts, filters.sort);

        return filteredProducts;
    }
    ));
  }

  get(productId: string){
    return this.db.object<Product>('/products/' + productId).snapshotChanges()
    .pipe(map(a => ({ key: a.key, ...a.payload.val() as Product })));
  }

  update(productId: string, product: any){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }

  private sorting(filteredProducts: any[], criteria: string) {
    switch (criteria) {
      case 'Low-High': {
         filteredProducts = filteredProducts.sort(
          (low, high) => low.salePrice - high.salePrice
          );
         break;
      }

      case 'High-Low': {
        filteredProducts = filteredProducts.sort(
          (low, high) => high.salePrice - low.salePrice
          );
        break;
      }

      case 'List (A-Z)': {
        filteredProducts.sort((a, b) => {
         if (a.title < b.title) {
            return -1;
         }
         if (a.title > b.title) {
            return 1;
         }
        });
        break;
      }
      case 'List (Z-A)': {
        filteredProducts.sort((a, b) => {
          if (a.title < b.title) {
             return 1;
          }
          if (a.title > b.title) {
             return -1;
          }
         });
        break;
      }
  }
    return filteredProducts;
  }

  private between(x: number, min: number, max: number) {
    return x >= min && x <= max;
  }

  private getPrices() {
    const prices = {
      'below 20': {min: 0, max: 20},
      '20-40': {min: 20, max: 40},
      '40-60': {min: 40, max: 60},
      '60-80': {min: 60, max: 80},
      'above 80': {min: 80, max: 200}
    };
    return prices;
  }

}
