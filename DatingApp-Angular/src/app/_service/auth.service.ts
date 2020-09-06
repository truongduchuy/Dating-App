import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiUrl +  'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  changePhotoUrl(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post(`${this.baseUrl}login`, user).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = response.user;
          this.changePhotoUrl(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}register`, user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
