import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(authS: AuthService, router: Router, userS: UserService){
    authS.user$.subscribe(user => {
      if (!user) { return; }
      userS.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });

  }
}

