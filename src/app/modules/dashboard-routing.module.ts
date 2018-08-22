import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardRoutes } from '../dashboard/dashboard.routes';
import { AuthenticationSecurityService } from '../services/authentication-security.service';

const childRoutes: Routes = [
    { path: '', component: DashboardComponent, children: DashboardRoutes /*canActivate: [AuthenticationSecurityService]*/ },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes)
  ],
  declarations: [
    
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule
{}
