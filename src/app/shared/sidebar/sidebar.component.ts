import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public authService: AuthenticationService)
  {}

  ngOnInit()
  {}

  AccountLogout()
  {
    this.authService.logoutSession();
  }
}
