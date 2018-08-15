import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
//import { of, throwError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService
{
  constructor(private fireAuth: AngularFireAuth, private routerApp: Router)
  {}

  initLoginListener()
  {
    this.fireAuth.authState.subscribe(stateAuth => console.log('Listener. ', stateAuth));
  }

  loginSession(email: string, password: string)
  {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logoutSession()
  {
    this.fireAuth.auth.signOut();
    this.routerApp.navigate(['/login']);
  }

  createUser(name: string, email: string, password: string)
  {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  existAuthetification()
  {
    return this.fireAuth.authState.pipe(
      map(stateAuth => {
        if(!stateAuth)
          this.routerApp.navigate(['/login']);
        
        return stateAuth!=null;
      }));
  }
}
