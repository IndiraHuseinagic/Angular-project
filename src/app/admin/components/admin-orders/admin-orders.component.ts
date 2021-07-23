import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$: Observable<any>;

  constructor(private orderS: OrderService) {
    this.orders$ = this.orderS.getOrders();
  }

}

