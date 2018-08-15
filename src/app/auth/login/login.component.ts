import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

import SweetAlert from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit
{
  constructor(private authService: AuthenticationService, private routeApp: Router)
  {}

  ngOnInit()
  {}

  loginAccount(loginData: NgForm)
  {
    console.log(loginData);

    let { mailing, pass } = loginData.value;

    if(mailing.trim()=='' || pass.trim()=='')
      return alert('Email and password is required');

    this.authService.loginSession(mailing.trim(), pass.trim()).then(resp => {
      console.log('-> ', resp);
      this.routeApp.navigate(['/']);
    }).catch(errorThrow => {
      SweetAlert('Login Info',errorThrow.message,'info')
    });
  }

}
