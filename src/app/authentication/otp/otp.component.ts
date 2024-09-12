import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent {
  otpMessage: string = 'OTP sent successfully, This otp is valid for 5 minutes';
  constructor(private router: Router, private authService: AuthService) {
    if (!this.authService.getOtpSent()) {
      this.router.navigate(['/auth/login']);
    } else {
      this.otpMessage = this.authService.getOtpMessage();
      setTimeout(() => {
        this.otpMessage = '';
      }, 10000);
    }
  }
}
