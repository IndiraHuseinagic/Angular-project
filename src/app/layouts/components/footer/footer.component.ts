import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
payments: string [];

  constructor() {
    const url1 = '/assets/img/payment/MasterCard.png';
    const url2 = '/assets/img/payment/Visa.png';
    const url3 = '/assets/img/payment/PayPal.png';
    this.payments = [url1, url2, url3];
   }

}
