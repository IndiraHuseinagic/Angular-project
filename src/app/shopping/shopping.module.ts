import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { CheckOutSummaryComponent } from './components/check-out-summary/check-out-summary.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderDataComponent } from './components/order-data/order-data.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    CheckOutSummaryComponent,
    MyOrdersComponent,
    OrderDataComponent,
    OrderDetailsComponent,
    OrderSuccessComponent,
    PaymentComponent,
    ProductQuantityComponent,
    ShippingFormComponent,
    ShoppingCartComponent
  ],

  imports: [
    SharedModule
  ]
})
export class ShoppingModule { }
