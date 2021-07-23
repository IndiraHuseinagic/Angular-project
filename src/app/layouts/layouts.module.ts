import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderLayoutComponent } from './components/order-layout/order-layout.component';



@NgModule({
  declarations: [
    BasicLayoutComponent,
    CheckOutComponent,
    FooterComponent,
    NavbarComponent,
    OrderLayoutComponent
  ],

  imports: [
    SharedModule
  ]
})
export class LayoutsModule { }
