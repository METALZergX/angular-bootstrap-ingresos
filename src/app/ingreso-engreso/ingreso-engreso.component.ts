import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupName } from '@angular/forms';
import { Income } from '../models/expense.model';
import { ExpensesService } from '../services/expenses.service';

import SweetAlert from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/interfaces/appstate.interface';
import { ActiveLoaderAction, InactiveLoaderAction } from '../redux/actions/ui.action';

@Component({
  selector: 'app-ingreso-engreso',
  templateUrl: './ingreso-engreso.component.html',
  styles: []
})
export class IngresoEngresoComponent implements OnInit, OnDestroy
{
  formReactive: FormGroup;
  typeIngresos: string = '';
  loadingState: boolean;
  subscriptionState: Subscription = new Subscription();

  constructor(private expenseService: ExpensesService, private store: Store<AppState>)
  {}

  ngOnInit()
  {
    this.subscriptionState = this.store.select('interface').subscribe(state => this.loadingState = state.isLoading);

    this.formReactive = new FormGroup({
      amount: new FormControl(0, Validators.min(1)),
      typed: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy()
  {
    this.subscriptionState.unsubscribe();
  }

  createIncome()
  {
    const dataFormReactive: Income = this.formReactive.value;

    this.store.dispatch(new ActiveLoaderAction());
    
    this.expenseService.createExprense(dataFormReactive).then(_ => {
      console.log('sucess');
      this.formReactive.reset({ typed: '', amount: 0, description: '' });
      this.store.dispatch(new InactiveLoaderAction());
      SweetAlert('Save Info',`${dataFormReactive.typed}: ${dataFormReactive.description}`,'success');
    }).catch(throwErr => {
      console.log(throwErr);
      this.store.dispatch(new InactiveLoaderAction());
      SweetAlert('Save Info',throwErr.message,'info');
    });
  }

}
