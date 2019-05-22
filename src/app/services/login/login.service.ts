import { JwtToken } from './../../domain/jwt-token';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //TODO move url to separate directiory.
  private url = `https://marblejs-example.herokuapp.com/api/v1`;

  constructor(private http: HttpClient) { }

  public login(login: string, password: string): Observable<JwtToken> {

    const credentials = { 
      login: login, 
      password: password 
    };

    return this.http.post(this.url + '/auth/login/', credentials)
    .pipe(
        map((res: JwtToken) => { 
          return res 
        }),
        catchError(this.handleError));
  }

  private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        if (errMsg === '400 - OK' || errMsg === '401 OK') {
            errMsg = 'Invalid username/password';
        }
        return throwError(errMsg);
    }
}
