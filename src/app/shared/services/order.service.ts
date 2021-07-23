import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { SharedDataService } from './shared-data.service';
import { Order } from 'shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cartS: ShoppingCartService,
    private sharedS: SharedDataService) {}

  async placeOrder(order: Order){
    const result = await this.db.list('/orders').push(order);
    this.cartS.clearCart();
    this.sharedS.changeShipping([]);
    this.sharedS.changePayment([]);
    return result;
  }

  getOrders(){
    return this.db.list('/orders').snapshotChanges()
    .pipe(map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() as Order })) ));
  }

  getOrdersByUserId(userId: string){
    return this.db.list('/orders', x => x.orderByChild('userId').equalTo(userId)).snapshotChanges()
      .pipe(map(actions =>
         actions.map(a => ({ key: a.key, ...a.payload.val() as Order })) ));
  }

  getOrderByOrderId(orderId: string){
    return this.db.object<Order>('/orders/' + orderId).valueChanges();
  }

}
