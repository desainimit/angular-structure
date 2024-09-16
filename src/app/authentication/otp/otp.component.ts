import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { TokenService } from '@app/core/services/token.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent {
  otpMessage: string = 'OTP sent successfully, This otp is valid for 5 minutes';

  otpForm!: FormGroup;
  isSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastService,
    private tokenService: TokenService
  ) {
    if (!this.authService.getOtpSent()) {
      this.router.navigate(['/auth/login']);
    } else {
      this.otpMessage = this.authService.getOtpMessage();
      setTimeout(() => {
        this.otpMessage = '';
      }, 10000);
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.otpForm = this.fb.group({
      otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submitOtpForm(): void {
    this.isSubmitted = true;
    this.isLoading = true;

    if (this.otpForm.valid) {
      this.authService.verifyOtp(this.otpForm.value).subscribe(
        (res) => {
          if (res.success) {
            this.isLoading = false;
            this.authService.setOtpSent(false);
            this.authService.setLoggedIn(true);
            this.tokenService.setToken('accessToken', res.data.accessToken);
            this.router.navigate(['/']);
            this.toastr.showSuccess(res.message);
          }
        },
        (error) => {
          this.isLoading = false;
          this.toastr.showError(error.error.message);
        }
      );
    } else {
      this.isLoading = false;
    }
  }
}
