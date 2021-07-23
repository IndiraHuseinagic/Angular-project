import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { AppUser } from 'shared/models/app-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userS: UserService) {

    this.user$ = afAuth.authState;
   }

  login(){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .pipe(switchMap (user => {

      if (user) {
       return this.userS.get(user.uid);
      }

       else {
       return of(null);
      }
    }));
  }

}
