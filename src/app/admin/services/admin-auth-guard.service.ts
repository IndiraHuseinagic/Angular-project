import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private authS: AuthService)  { }

  canActivate(): Observable<boolean>{
    return this.authS.appUser$.pipe(map(appUser => appUser.isAdmin));
  }

}
