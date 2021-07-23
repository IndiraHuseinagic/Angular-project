import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { AppUser } from 'shared/models/app-user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User){
   this.db.object('/users/' + user.uid).update({
    name: user.displayName,
    email: user.email});
  }

  get(userId: string): Observable<AppUser>  {
    return this.db.object<AppUser>('/users/' + userId).valueChanges();
  }

}
