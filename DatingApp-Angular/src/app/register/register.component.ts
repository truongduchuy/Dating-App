import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService) {}
  @Output() toggleRegister = new EventEmitter();

  ngOnInit() {}

  register() {
    this.authService.register(this.user).subscribe(
      () => this.alertify.success('Registration successful'),
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    this.toggleRegister.emit();
  }
}
