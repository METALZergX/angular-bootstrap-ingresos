import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/interfaces/appstate.interface';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy
{
  accountName: string;
  authSubscription: Subscription = new Subscription();

  constructor(public authService: AuthenticationService, private store: Store<AppState>)
  {}

  ngOnInit()
  {
    this.authSubscription = this.store.select('authentication').pipe(filter(stream => stream !== null)).subscribe(state => {
      if(state.account !== null)
        this.accountName = state.account.name;
    });
  }

  ngOnDestroy()
  {
    this.authSubscription.unsubscribe();
  }

  AccountLogout()
  {
    this.authService.logoutSession();
  }
}
