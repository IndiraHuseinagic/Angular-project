import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent {

  @Input() category: string;
  categories$: Observable<any []>;

  constructor(private categoryS: CategoryService) {
    this.categories$ = this.categoryS.getAll();
  }



}
