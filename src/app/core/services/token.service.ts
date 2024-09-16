import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken(tokenName: string): string | null {
    const tokenData = localStorage.getItem(tokenName);

    if (tokenData) {
      const parsedToken = JSON.parse(tokenData);
      const now = new Date().getTime();

      if (now < parsedToken.expiresAt) {
        return parsedToken.value;
      } else {
        localStorage.removeItem(tokenName); // Token expired, so remove it
        return null;
      }
    }

    return null;
  }

  setToken(tokenName: string, tokenValue: string): boolean {
    const maxAge = 60 * 60 * 24 * 1000; // 1 day in milliseconds
    const now = new Date().getTime();
    const expiresAt = now + maxAge;

    const tokenData = {
      value: tokenValue,
      expiresAt: expiresAt,
    };

    localStorage.setItem(tokenName, JSON.stringify(tokenData));
    return true;
  }

  clearToken(tokenName: string): boolean {
    localStorage.removeItem(tokenName);
    return true;
  }

  isTokenAvailable(tokenName: string): boolean {
    return !!localStorage.getItem(tokenName);
  }
}
