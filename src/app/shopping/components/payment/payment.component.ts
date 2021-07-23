import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'shared/services/shared-data.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  {
payPal: string;
masterCard: string;
visa: string;
bank: string;
payment: any;


  constructor(private router: Router, private sharedS: SharedDataService) {
      this.masterCard = '/assets/img/payment/MasterCard.png';
      this.visa = '/assets/img/payment/Visa.png';
      this.payPal = '/assets/img/payment/PayPal.png';
      this.bank = '/assets/img/payment/bank.png';
  }

  submitPayment(f: any) {
    this.payment = f.payment;
    this.sharedS.changePayment(this.payment);
    this.router.navigate(['/check-out/summary']);
  }

}
