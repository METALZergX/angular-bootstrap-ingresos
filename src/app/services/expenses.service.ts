import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { AuthenticationService } from './authentication.service';
import { User } from '../models/user.model';
import { Income } from '../models/expense.model';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/interfaces/appstate.interface';
import { filter, map, concatAll } from 'rxjs/operators';
import { SetIncomeAction, UnsetIncomeAction } from '../redux/actions/expense.action';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService
{
  private storeObservers: Subscription = new Subscription;
  private fireStoreObservers: Subscription = new Subscription;
  
  constructor(private fireStore: AngularFirestore, private authService: AuthenticationService, private store: Store<AppState>)
  {}

  initExpenseListener()
  {
    this.storeObservers = this.store.select('authentication').pipe(filter(auth => auth !== null)).subscribe(state => {
      if(state.account !== null)
        this.getExpenseAccount(state.account.uid);
    });
  }

  getExpenseAccount(uid: string)
  {
    this.fireStoreObservers = this.fireStore.collection(`${uid}/expenses/economy`).snapshotChanges().pipe(map(doc => {
      return doc.map(item => {
        return { uid: item.payload.doc.id, ...item.payload.doc.data() }
      })
    })).subscribe((collect: any[]) => { console.log(collect); this.store.dispatch(new SetIncomeAction(collect)) });
  }

  cleanAllSubscription()
  {
    this.storeObservers.unsubscribe();
    this.fireStoreObservers.unsubscribe();
    this.store.dispatch(new UnsetIncomeAction());
  }

  createExprense(expense: Income)
  {
    const activeUser: User = this.authService.getUserActive();
    
    return this.fireStore.doc(`${activeUser.uid}/expenses`).collection('economy').add(expense);
  }

  removeExpenseInAccount(uidExpense: string)
  {
    const activeUser: User = this.authService.getUserActive();

    return this.fireStore.collection(`${activeUser.uid}/expenses/economy/`).doc(`${uidExpense}`).delete();
  }
}
