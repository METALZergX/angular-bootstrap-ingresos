import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/interfaces/appstate.interface';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy
{
  accountName: string;
  authSubscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>)
  {}

  ngOnInit()
  {
    this.authSubscription= this.store.select('authentication').pipe(filter(stream => stream !== null)).subscribe(state => {
      if(state.account !== null)
        this.accountName = state.account.name;
    });
  }

  ngOnDestroy()
  {
    this.authSubscription.unsubscribe();
  }
}
