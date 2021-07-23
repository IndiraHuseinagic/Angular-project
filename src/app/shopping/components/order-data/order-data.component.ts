import { Component, Input } from '@angular/core';
import { CartProduct } from 'shared/models/cart-product';


@Component({
  selector: 'order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css']
})
export class OrderDataComponent {
@Input() items: CartProduct[];
@Input() totalPrice: number;
@Input() shipping: any;
@Input() payment: string;

  constructor() {}
}
