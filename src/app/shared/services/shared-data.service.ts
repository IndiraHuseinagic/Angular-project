import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public shipping = new BehaviorSubject<any>([]);
  public payment = new BehaviorSubject<any>([]);
  public currentShipping = this.shipping.asObservable();
  public currentPayment = this.payment.asObservable();

  constructor() {}

  changeShipping(detail: any) {
    this.shipping.next(detail);
  }

  changePayment(detail: any) {
    this.payment.next(detail);
  }

}
