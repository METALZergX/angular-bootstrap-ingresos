import { Routes } from "@angular/router";
import { StatisticsComponent } from "../ingreso-engreso/statistics/statistics.component";
import { IngresoEngresoComponent } from "../ingreso-engreso/ingreso-engreso.component";
import { DetailComponent } from "../ingreso-engreso/detail/detail.component";

export const DashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent },
    { path: 'ingresos', component: IngresoEngresoComponent },
    { path: 'detail', component: DetailComponent }
];