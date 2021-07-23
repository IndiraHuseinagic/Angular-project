import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  google: string;

  constructor(private authS: AuthService) {
    this.google = '/assets/img/logo/google.png';
   }

   login(){
    this.authS.login();
   }
}
