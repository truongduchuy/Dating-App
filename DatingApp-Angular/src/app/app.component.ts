import { Component, OnInit } from '@angular/core';
import { AuthService } from './_service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService()
  title = 'DatingApp-Angular';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      console.log('this.authService.decodedToken', this.authService.decodedToken)
    }
  }
}
