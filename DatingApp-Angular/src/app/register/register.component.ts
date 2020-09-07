import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: any = {};
  registerform: FormGroup;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}
  @Output() toggleRegister = new EventEmitter();

  ngOnInit() {
    this.registerform = new FormGroup({
      username: new FormControl('Hello', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  register() {
    // this.authService.register(this.user).subscribe(
    //   () => this.alertify.success('Registration successful'),
    //   (error) => {
    //     this.alertify.error(error);
    //   }
    // );
    console.log(this.registerform.value);
  }

  cancel() {
    this.toggleRegister.emit();
  }
}
