import { Inject, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '@core/interceptors/base-url.interceptor';
import {
  IAuthLoginUserService,
  IAuthRegisterUserService,
} from '@core/models/interfaces/IAuthServices';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private OtpSent: boolean = false;
  private otpMessage: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  login(user: IAuthLoginUserService): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/login', user);
  }

  getOtpSent(): boolean {
    return this.OtpSent;
  }

  setOtpSent(value: boolean, otpMessage?: string): boolean {
    this.OtpSent = value;
    this.otpMessage != otpMessage;
    return true;
  }

  getOtpMessage(): string {
    return this.otpMessage;
  }

  registerUser(user: IAuthRegisterUserService): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/register', user);
  }
}
