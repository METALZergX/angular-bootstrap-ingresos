import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
//import { of, throwError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/interfaces/appstate.interface';
import { SetAccountAction, UnsetAccountAction } from '../redux/actions/auth.action';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService
{
  private userActive: User;
  private loginObserver: Subscription = new Subscription;

  constructor(private fireAuth: AngularFireAuth, private routerApp: Router, private fireStore: AngularFirestore, private store: Store<AppState>)
  {}

  initLoginListener()
  {
    this.loginObserver = this.fireAuth.authState.subscribe(stateAuth => {
      if(stateAuth)
        this.fireStore.doc(`${stateAuth.uid}/info`).valueChanges().subscribe((doc: User) => {
          this.userActive = doc;
          this.store.dispatch(new SetAccountAction(doc));
        });
      else
        this.userActive = null;
        this.loginObserver.unsubscribe();

      console.log('Listener. ', stateAuth);
    });
  }

  loginSession(email: string, password: string)
  {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logoutSession()
  {
    this.fireAuth.auth.signOut();
    this.routerApp.navigate(['/login']);
    this.store.dispatch(new UnsetAccountAction());
  }

  createUser(name: string, email: string, password: string)
  {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  existAuthetification()
  {
    return this.fireAuth.authState.pipe(
      map(stateAuth => {
        if(!stateAuth)
          this.routerApp.navigate(['/login']);
        
        return stateAuth!=null;
      }));
  }

  getUserActive(): User
  {
    return { ...this.userActive };
  }
}
