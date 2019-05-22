import { AlertService } from 'ngx-alerts';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Log } from 'ng2-logger/client';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
    private log = Log.create('AuthInterceptor');

    constructor(private router: Router, 
                private authService: AuthService,
                private alertService: AlertService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                  this.log.d('Unauthorized response returned: ', err.status);
                  this.alertService.warning('Unauthorized access')
                  this.authService.removeToken();
                  this.router.navigate(['/']);
              }
            }
          })
      
      ) 
    }
}