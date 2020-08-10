import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post(`${this.baseUrl}login`, user).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
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
