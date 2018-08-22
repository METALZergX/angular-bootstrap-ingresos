import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, ExpenseAppState } from '../../redux/interfaces/appstate.interface';
import { Income } from '../../models/expense.model';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';

import SweetAlert from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy
{
  listExpenses: Income[] = [];
  private detailObserver: Subscription = new Subscription;

  constructor(private store: Store<ExpenseAppState>, private expenseService: ExpensesService) //AppState
  {}

  ngOnInit()
  {
    this.detailObserver = this.store.select('income').subscribe(state => this.listExpenses = state.income);
  }

  ngOnDestroy()
  {
    this.detailObserver.unsubscribe();
  }

  deleteExpense(uid: string)
  {
    console.log('-> ', uid);
    this.expenseService.removeExpenseInAccount(uid).then(item => {
      SweetAlert('Delete Info','An expense has been removed','success');
    }).catch(err => {
      SweetAlert('Delete Info',err.message,'info');
    });
  }

}
