import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Log } from "ng2-logger/client";
import { AlertService } from "ngx-alerts";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import * as fromStore from "../../store";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
  private log = Log.create("AuthInterceptor");

  constructor(
    private store: Store<fromStore.MoviesState>,
    private alertService: AlertService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.log.d("Unauthorized response returned: ", err.status);
              this.alertService.warning("Unauthorized access");
              this.store.dispatch(new fromStore.UserSystemLogout());
            }
          }
        }
      )
    );
  }
}
