import { IAuthRegisterUserService } from '@core/models/interfaces/IAuthServices';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl(''),
    });
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      this.authService
        .registerUser(this.registerForm.value as IAuthRegisterUserService)
        .subscribe(
          (res) => {
            // console.log(res);
          },
          (error) => {
            this.toastr.showError(error.error.message);
          }
        );
    }
  }
}
