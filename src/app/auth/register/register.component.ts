import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

import SweetAlert from 'sweetalert2';
import { Store } from '@ngrx/store';

import { User } from '../../models/user.model';
import { AppState } from '../../redux/interfaces/appstate.interface';
import { ActiveLoaderAction, InactiveLoaderAction } from '../../redux/accions/ui.accion';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy
{
  loadingState: boolean;
  subscriptionState: Subscription;

  constructor(private authService: AuthenticationService, private routeApp: Router, private fireStore: AngularFirestore, private store: Store<AppState>)
  {}

  ngOnInit()
  {
    this.subscriptionState = this.store.select('interface').subscribe(state => this.loadingState = state.isLoading);
  }

  ngOnDestroy()
  {
    this.subscriptionState.unsubscribe();
  }

  registerAccount(registerData: NgForm)
  {
    let { nombre, mailing, password } = registerData.value;

    if(nombre.trim()=='' || mailing.trim()=='' || password.trim()=='')
      return alert('all data is required');

    this.store.dispatch(new ActiveLoaderAction());
    
    this.authService.createUser(nombre, mailing, password).then(response => {
      registerData.reset();
      const newAccount: User = { name: nombre, email: response.user.email, uid: response.user.uid };
      console.log('User. ', newAccount);
      this.fireStore.collection(newAccount.uid).doc('info').set(newAccount).then(_ => {
        this.routeApp.navigate(['/']);
        this.store.dispatch(new InactiveLoaderAction());
      });//.catch(err => console.error(err.message));
    }).catch(throwErr => {
      this.store.dispatch(new InactiveLoaderAction());
      SweetAlert('Register Info',throwErr.message,'info');
    });
  }
}
