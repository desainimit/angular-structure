import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable } from 'rxjs';

export const API_URL = new InjectionToken<string>('API_URL');

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private haveToAppendApiUrl = (url: string) =>
    !(this.apiUrl && url.includes('assets'));
  constructor(@Optional() @Inject(API_URL) private apiUrl?: string) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.haveToAppendApiUrl(req.url)
      ? next.handle(
          req.clone({
            url: this.prependBaseUrl(req.url),
            headers: new HttpHeaders({
              "allow-access-control-origin": "*",
              'Content-Type': 'application/json',
            })
          })
        )
      : next.handle(req);
  }

  private prependBaseUrl(url: string) {
    return [this.apiUrl?.replace(/\/$/g, ''), url.replace(/^\.?\//, '')]
      .filter((val) => val)
      .join('/');
  }
}
