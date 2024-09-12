import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthLoginUserService } from '@app/core/models/interfaces/IAuthServices';
import { AuthService } from '@app/core/services/auth.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  isLoading: boolean = false;

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
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitLoginForm() {
    this.isSubmitted = true;
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value as IAuthLoginUserService)
        .subscribe(
          (res) => {
            const isOtpSent = this.authService.setOtpSent(true, res.message);
            if (isOtpSent) {
              this.isLoading = false;
              this.authService.setOtpSent(false);
              this.router.navigate(['/auth/otp']);
            }
          },
          (error) => {
            console.log(error);

            this.isLoading = false;
            this.toastr.showError(error.error.message);
          }
        );
    } else {
      this.isLoading = false;
    }
  }
}
