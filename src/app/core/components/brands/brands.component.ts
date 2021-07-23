import { Component } from '@angular/core';

@Component({
  selector: 'brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
brands: string [];

  constructor() {
    const url1 = 'assets/img/brands/calvinKlein.jpg';
    const url2 = 'assets/img/brands/bullboxer.jpg';
    const url3 = 'assets/img/brands/skechers.jpg';
    const url4 = 'assets/img/brands/timberland.jpg';
    const url5 = 'assets/img/brands/tommyHilfiger.jpg';
    const url6 = 'assets/img/brands//napapijri.jpg';
    const url7 = 'assets/img/brands/polo.jpg';
    const url8 = 'assets/img/brands/laStrada.jpg';
    const url9 = 'assets/img/brands/karlLagerfeld.jpg';
    const url10 = 'assets/img/brands/lacoste.jpg';
    const url11 = 'assets/img/brands/newBalance.jpg';
    const url12 = 'assets/img/brands/converse.jpg';
    const url13 = 'assets/img/brands/puma.jpg';
    const url14 = 'assets/img/brands/vans.jpg';

    this.brands = [url1, url2, url3, url4, url5, url6, url7, url8, url9, url10, url11, url12, url13, url14];
   }

}
