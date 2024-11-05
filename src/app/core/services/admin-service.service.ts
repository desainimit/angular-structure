import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '@core/interceptors/base-url.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl + '/auth/getUsers', {
      withCredentials: true,
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.post(
      this.apiUrl + '/user/delete-user',
      { userId },
      {
        withCredentials: true,
      }
    );
  }
}
