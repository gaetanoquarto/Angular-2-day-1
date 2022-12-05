import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Ti sto intercettando da auth interceptor!', request);
    const newReq = request.clone({
      headers: request.headers.append('Auth', 'secretId').append('firma', 'xyz')
    });
    return next.handle(newReq).pipe(tap(event => {
      console.log('Nuova richiesta:', newReq);
      console.log('Sono la risposta della chiamata da auth interceptor', event);
    }));
  }
}
