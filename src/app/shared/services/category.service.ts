import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', x => x.orderByChild('sort')).snapshotChanges()
    .pipe(map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() as {} }))
      )
    );
  }
}
