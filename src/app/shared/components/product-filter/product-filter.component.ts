import { Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component ({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

@ViewChildren('checkboxes') checkboxes: QueryList <ElementRef>;

allSizes: number[];
allBrands: string[];
allPrices: string[];
allColors: string[];

sizes: number[] = [];
brands: string[] = [];
prices: string[] = [];
colors: string[] = [];
sort: string = null;
isFiltered = false;
selectedSort: string;

 constructor(private router: Router, private route: ActivatedRoute) {
  this.allSizes = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
  this.allBrands = ['Tommy Hilfiger', 'Karl Lagerfeld', 'Calvin Klein', 'Polo R.L.', 'Skechers', 'Bullboxer',
                   'Timberland', 'Napapijri', 'Lacoste', 'Converse', 'Vans', 'Puma', 'La Strada', 'New Balance'];
  this.allPrices = ['below 20', '20-40', '40-60', '60-80', 'above 80'];
  this.allColors = ['white', 'black', 'red', 'green', 'blue', 'grey', 'yellow', 'orange', 'pink', 'gold', 'multicolored'];
  this.selectedSort = 'Sort by';
}

// Query from Filter
onChange(){
const checked = this.checkboxes.filter(el => el.nativeElement.checked);


// Is filter applied
if (checked.length > 0) {
 this.isFiltered = true;
}
else { this.isFiltered = false; }

// Sizes selected
this.sizes = checked
  .filter(el => el.nativeElement.name === 'size')
  .map(el => el.nativeElement.defaultValue);

// Brands selected
this.brands = checked
  .filter(el => el.nativeElement.name === 'brand')
  .map(el => el.nativeElement.defaultValue);

// Colors selected
this.colors = checked
  .filter(el => el.nativeElement.name === 'color')
  .map(el => el.nativeElement.defaultValue);

// Prices selected
this.prices = checked
  .filter(el => el.nativeElement.name === 'price')
  .map(el => el.nativeElement.defaultValue);

this.navigateRoute();
}

// Query from Sort
onSort(event: any) {
  this.sort = event.target.value;
  this.selectedSort = event.target.value;
  this.navigateRoute();
}

// Query Params
navigateRoute() {
  this.router.navigate([],
    {queryParams: {
      size:  (this.sizes.length)  ? this.sizes :  null,
      brand: (this.brands.length) ? this.brands : null,
      price: (this.prices.length) ? this.prices : null,
      color: (this.colors.length) ? this.colors : null,
      sort:   this.sort
    }, queryParamsHandling: 'merge' }
  );
}

// Delete all selected options
deleteAllFilters() {
this.checkboxes.forEach(element =>
  element.nativeElement.checked = false);
this.onChange();
}

// Delete one selected option
deleteFilter(item: any){
 const element = this.checkboxes
   .find(el => (el.nativeElement.defaultValue === item &&
                el.nativeElement.checked === true));
 element.nativeElement.checked = false;
 this.onChange();
}

// Modal
openModal(){
  const modalF  = document.getElementById('modal-filter');
  modalF.classList.remove('d-none');
  modalF.classList.add('d-block');
}

closeModal() {
 const modalF  = document.getElementById('modal-filter');
 modalF.classList.remove('d-block');
 modalF.classList.add('d-none');
}

}
