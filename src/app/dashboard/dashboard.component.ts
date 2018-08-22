import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/interfaces/appstate.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy
{
  constructor(private expenseService: ExpensesService)
  {}

  ngOnInit()
  {
    this.expenseService.initExpenseListener();
  }

  ngOnDestroy()
  {}

}
