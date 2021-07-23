import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authS: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
  return this.authS.user$.pipe(map(user => {
     if (user) {
     return true;
     }
     else {
       this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
       return false;
       }
   }));
  }
}
