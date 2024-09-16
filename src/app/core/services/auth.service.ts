import { Inject, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '@core/interceptors/base-url.interceptor';
import {
  IAuthLoginUserService,
  IAuthRegisterUserService,
} from '@core/models/interfaces/IAuthServices';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private OtpSent: boolean = false;
  private otpMessage: string = '';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    @Inject(API_URL) private apiUrl: string
  ) {
    if (this.tokenService.isTokenAvailable('accessToken')) {
      this.setLoggedIn(true);
    }
  }

  registerUser(user: IAuthRegisterUserService): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/register', user, {
      withCredentials: true,
    });
  }

  login(user: IAuthLoginUserService): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/login', user, {
      withCredentials: true,
    });
  }

  verifyOtp(otp: string): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/verifyOtp', otp, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/logout', {
      withCredentials: true,
    });
  }

  getRolePermissions(): Observable<any> {
    return this.http.get(this.apiUrl + '/auth/getRoleAndPermissions', {
      withCredentials: true,
    });
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

  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }

  isLoggedIn() {
    return this.tokenService.isTokenAvailable('accessToken');
  }
}
