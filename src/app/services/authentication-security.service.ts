import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationSecurityService implements CanActivate
{
  constructor(private authService: AuthenticationService)
  {}

  canActivate(): Observable<boolean>
  {
    return this.authService.existAuthetification();
  }
}
