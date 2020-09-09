import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: any = {};
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {}
  @Output() toggleRegister = new EventEmitter();

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get('password').value === group.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  register() {
    // this.authService.register(this.user).subscribe(
    //   () => this.alertify.success('Registration successful'),
    //   (error) => {
    //     this.alertify.error(error);
    //   }
    // );
    console.log(this.registerForm.value);
  }

  cancel() {
    this.toggleRegister.emit();
  }
}
