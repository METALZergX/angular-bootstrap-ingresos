import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

import SweetAlert from 'sweetalert2';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit
{
  constructor(private authService: AuthenticationService, private routeApp: Router, private fireStore: AngularFirestore)
  {}

  ngOnInit()
  {}

  registerAccount(registerData: NgForm)
  {
    console.log(registerData);
    let { nombre, mailing, password } = registerData.value;

    if(nombre.trim()=='' || mailing.trim()=='' || password.trim()=='')
      return alert('all data is required');
    
    this.authService.createUser(nombre, mailing, password).then(response => 
    {
      registerData.reset();
      const newAccount: User = { name: nombre, email: response.user.email, uid: response.user.uid };
      console.log('User. ', newAccount);
      //this.fireStore.doc('users').set(newAccount).then(fire =>  console.log(fire)).catch(err => console.error(err));
      this.fireStore.collection('users').doc(newAccount.uid).set(newAccount).then(_ => this.routeApp.navigate(['/'])).catch(err => console.error(err.message));
    }).catch(throwErr => {
      SweetAlert('Register Info',throwErr.message,'info');
    });
  }
}
