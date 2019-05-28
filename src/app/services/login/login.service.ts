import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { JwtToken } from './../../domain/jwt-token';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private url = `https://marblejs-example.herokuapp.com/api/v1`;

  constructor(private http: HttpClient) {}

  public login(credentials: any): Observable<JwtToken> {
    return this.http.post(this.url + "/auth/login", credentials).pipe(
      map((res: JwtToken) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : "Server error";
    if (errMsg === "400 - OK" || errMsg === "401 OK") {
      errMsg = "Invalid username/password";
    }
    return throwError(errMsg);
  }
}
