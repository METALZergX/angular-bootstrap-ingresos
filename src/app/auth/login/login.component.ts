import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, NgForm, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

import SweetAlert from 'sweetalert2';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../redux/interfaces/appstate.interface';
import { ActiveLoaderAction, InactiveLoaderAction } from '../../redux/accions/ui.accion';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy
{
  loadingState: boolean;
  subscriptionState: Subscription;

  constructor(private authService: AuthenticationService, private routeApp: Router, private store: Store<AppState>)
  {}

  ngOnInit()
  {
    this.subscriptionState = this.store.select('interface').subscribe(state => this.loadingState = state.isLoading);
  }

  ngOnDestroy()
  {
    this.subscriptionState.unsubscribe();
  }

  loginAccount(loginData: NgForm)
  {
    console.log(loginData);

    let { mailing, pass } = loginData.value;

    if(mailing.trim()=='' || pass.trim()=='')
      return alert('Email and password is required');

    this.store.dispatch(new ActiveLoaderAction());

    this.authService.loginSession(mailing.trim(), pass.trim()).then(resp => {
      console.log('-> ', resp);
      this.routeApp.navigate(['/']);
      this.store.dispatch(new InactiveLoaderAction());
    }).catch(errorThrow => {
      this.store.dispatch(new InactiveLoaderAction());
      SweetAlert('Login Info',errorThrow.message,'info')
    });
  }

}
