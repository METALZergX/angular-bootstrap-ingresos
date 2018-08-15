import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutes } from './dashboard/dashboard.routes';
import { AuthenticationSecurityService } from './services/authentication-security.service';

const RouteApp: Routes = [
    { path: '', component: DashboardComponent, children: DashboardRoutes, canActivate: [AuthenticationSecurityService] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(RouteApp)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule
{

}