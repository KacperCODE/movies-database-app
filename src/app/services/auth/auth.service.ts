import { AlertService } from 'ngx-alerts';
import { User } from './../../domain/user';
import { JwtToken } from './../../domain/jwt-token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as fromStore from '../../store'
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenId: string = "JWT_TOKEN";
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private store: Store<fromStore.MoviesState>,
              private router: Router,
              private alertService: AlertService) {
    this.loginUserIfTokenValid();
  }

  private loginUserIfTokenValid() {
    if (this.isJwtValid(null)) {
      this.setLoggedInUser();
    }
  }

  public login(token: JwtToken): void {
    if (this.isJwtValid(token.token)) {
      localStorage.setItem(this.tokenId, token.token);
      this.setLoggedInUser();
      this.router.navigate(['/list']);
    }
  }

  private setLoggedInUser(): void {
    let token: string = localStorage.getItem(this.tokenId);
    let decodedToken = this.jwtHelper.decodeToken(token);
    const user: User = new User(decodedToken.email);

    this.store.dispatch(new fromStore.SetUserData(user));
    this.alertService.info('Logged In');
  }

  public systemLogout(): void {
    localStorage.removeItem(this.tokenId);
    this.router.navigate(['']);
  }

  public manualLogout(): void {
    this.systemLogout();
    this.alertService.info('Logged Out');
  }

  /**
   * There is no backend tokend validation implemented on the API,
   * therefore we only check if it has not expired yet.
   */
  public isJwtValid(token): boolean {
    let resultToken: string = token;
    if(!resultToken) {
      resultToken = this.getToken();
    }
    return resultToken != null && !this.jwtHelper.isTokenExpired(resultToken, this.getUtcDate());
  }

  public getToken(): string {
    return localStorage.getItem(this.tokenId);
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenId);
  }

  public getUtcDate() : number {
    return new Date().getUTCDate();
  }

}
