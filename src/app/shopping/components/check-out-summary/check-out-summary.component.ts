import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AuthService } from 'shared/services/auth.service';
import { SharedDataService } from 'shared/services/shared-data.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';

@Component({
  selector: 'check-out-summary',
  templateUrl: './check-out-summary.component.html',
  styleUrls: ['./check-out-summary.component.css']
})
export class CheckOutSummaryComponent implements OnInit {

  user$: Observable<firebase.User>;
  cart$: Observable<ShoppingCart>;
  payment$: Observable<string>;
  shipping$: Observable<any>;

  constructor(
    private cartS: ShoppingCartService,
    private authS: AuthService,
    private sharedS: SharedDataService,
    private orderS: OrderService,
    private router: Router){}

  async ngOnInit() {
    this.user$ = this.authS.user$;
    this.cart$ = await this.cartS.getCart();
    this.shipping$ = this.sharedS.shipping;
    this.payment$ = this.sharedS.payment;
  }

  orderProducts(userId: string, shipping: any, payment: string, cart: ShoppingCart) {

    if (shipping.length === 0) {
        alert('You need to enter shipping data!');
        this.router.navigate(['/check-out/shipping']);
    }
    else if (payment.length === 0) {
        alert('You need to enter payment type!');
        this.router.navigate(['/check-out/payment']);
     }
     else {
         const order = new Order(userId, shipping, payment, cart);
         this.orderS.placeOrder(order);
         this.router.navigate(['/order-success']);
     }
  }

}
