import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: any = {};
  constructor(private authService: AuthService) {}
  @Output() toggleRegister = new EventEmitter();

  ngOnInit() {}

  register() {
    this.authService
      .register(this.user)
      .subscribe(() => console.log('Registration successful'));
  }

  cancel() {
    this.toggleRegister.emit();
  }
}
