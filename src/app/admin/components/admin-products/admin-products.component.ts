import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';



@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
 products: Product[];
 filteredProducts: Product[];
 subscription: Subscription;

  constructor(private productS: ProductService) {
    this.subscription = this.productS.getAll().subscribe(products =>
      this.filteredProducts = this.products = products);
   }

  ngOnInit(): void {
  }

  filter(query: string){
    this.filteredProducts = (query) ?
    this.products.filter(x => x.title.toLowerCase().includes(query.toLowerCase())) :
     this.products;
  }

  ngOnDestroy(): void {
  this.subscription.unsubscribe();
  }
}
