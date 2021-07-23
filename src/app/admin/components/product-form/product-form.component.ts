import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$: Observable<any>;
  product: any = {};
  productId: string;

  constructor(
    private categoryS: CategoryService,
    private productS: ProductService,
    private router: Router,
    private route: ActivatedRoute) {

   this.categories$ = this.categoryS.getAll();
   this.productId = this.route.snapshot.paramMap.get('id');

   if (this.productId){
     this.productS.get(this.productId).pipe(take(1)).subscribe(product => this.product = product);
   }
  }

  save(product){
    if (this.productId) {
    this.productS.update(this.productId, product);
    }

    else {
    this.productS.create(product);
    }

    this.router.navigate(['admin/products']);
  }

  delete(){
    if (!confirm('Are you sure you want to delete this product?')) { return; }

    this.productS.delete(this.productId);
    this.router.navigate(['admin/products']);
  }

}
