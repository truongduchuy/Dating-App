import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.user).subscribe(
      (res) => {
        this.alertify.success('Logged in successfully');
      },
      (err) => {
        this.alertify.error(err);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }
}
