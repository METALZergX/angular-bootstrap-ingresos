import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, ExpenseAppState } from '../../redux/interfaces/appstate.interface';
import { Subscription } from 'rxjs';
import { Income } from '../../models/expense.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit, OnDestroy
{
  totalEgresos: number = 0;
  totalIngresos: number = 0;

  sumaEgresos: number = 0;
  sumaIngresos: number = 0;

  pieChartLabels: string[] = ['Egresos','Ingresos'];
  pieChartData: number[] = [];

  statisticSubscription: Subscription = new Subscription();

  constructor(private store: Store<ExpenseAppState>) //AppState
  {}

  ngOnInit()
  {
    this.statisticSubscription = this.store.select('income').pipe(filter(stream => stream.income.length > 0)).subscribe(state => this.calculateExpenses(state.income));
  }

  ngOnDestroy()
  {
    this.statisticSubscription.unsubscribe();
  }

  calculateExpenses(expenses: Income[])
  {
    this.sumaEgresos = 0;
    this.totalEgresos = 0;

    this.sumaIngresos = 0;
    this.totalIngresos = 0;

    expenses.forEach(expense => {
      if(expense.typed === 'Ingreso')
      {
        this.totalIngresos++;
        this.sumaIngresos += expense.amount;
      }
      else
      {
        this.totalEgresos++;
        this.sumaEgresos += expense.amount;
      }
    });

    this.pieChartData = [this.sumaEgresos, this.sumaIngresos];
  }
}
