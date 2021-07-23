import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';


@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: Observable<Order []>;

  constructor(
    private authS: AuthService,
    private orderS: OrderService) {

    this.orders$ = this.authS.user$.pipe(switchMap(user => this.orderS.getOrdersByUserId(user.uid)));
  }
}
