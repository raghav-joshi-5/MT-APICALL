import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authclone = req.clone({
      setHeaders: {
        authToken: `JWT token form LS`,
        'conent-type': 'Application/json',
      },
    });
    return next.handle(authclone);
  }
}
