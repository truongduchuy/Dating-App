import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { UserService } from '../_service/user.service';
import { AuthService } from '../_service/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.currentUser?.id).pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
