import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationSecurityService implements CanActivate, CanLoad
{
  constructor(private authService: AuthenticationService)
  {}

  canActivate(): Observable<boolean>
  {
    return this.authService.existAuthetification();
  }

  canLoad(): Observable<boolean>
  {
    return this.authService.existAuthetification().pipe(take(1));
  }
}
