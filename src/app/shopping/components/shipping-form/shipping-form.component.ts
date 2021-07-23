import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SharedDataService } from 'shared/services/shared-data.service';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent  {

  shipping = {
    firstName: '',
    lastName: '',
    country: '',
    street: '',
    number: '',
    zip: '',
    city: '',
    phone: ''
  };


constructor(private router: Router, private sharedS: SharedDataService) { }

  submitShipping() {
    this.sharedS.changeShipping(this.shipping);
    this.router.navigate(['/check-out/payment']);
  }

}
