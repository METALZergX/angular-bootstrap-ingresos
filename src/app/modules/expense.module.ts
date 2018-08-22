import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEngresoComponent } from '../ingreso-engreso/ingreso-engreso.component';
import { StatisticsComponent } from '../ingreso-engreso/statistics/statistics.component';
import { DetailComponent } from '../ingreso-engreso/detail/detail.component';
import { DetailPipe } from '../pipes/detail.pipe';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from './shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { ExpenseReducer } from '../redux/reducers/expense.reducer';

@NgModule({
    declarations: [
        DashboardComponent,
        IngresoEngresoComponent,
        StatisticsComponent,
        DetailComponent,
        DetailPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ChartsModule,
        SharedModule,
        StoreModule.forFeature('income', ExpenseReducer),
        DashboardRoutingModule
    ]
})
export default class ExpenseModule
{}