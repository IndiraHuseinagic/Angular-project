import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';



@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  orderId: string;
  orders$: Observable<Order>;

  constructor(
    private route: ActivatedRoute,
    private orderS: OrderService) {

    this.orderId = this.route.snapshot.paramMap.get('id');
    this.orders$ = this.orderS.getOrderByOrderId(this.orderId);
  }

}
