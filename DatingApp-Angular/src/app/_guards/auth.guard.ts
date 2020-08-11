import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}
  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You shall not pass');
    this.router.navigate(['/home']);
  }
}
