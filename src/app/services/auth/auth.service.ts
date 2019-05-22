import { AlertService } from 'ngx-alerts';
import { Log } from 'ng2-logger/client';
import { User } from './../../domain/user';
import { JwtToken } from './../../domain/jwt-token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private log = Log.create('AuthService');

  private tokenId: string = "JWT_TOKEN";
  private jwtHelper: JwtHelperService = new JwtHelperService();
  // TODO Move to Store NgRx
  public user: User;

  //TODO Implement Initialisation service for validating JWT.

  constructor(private router: Router,
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
    }
  }

  private setLoggedInUser(): void {
    let token: string = localStorage.getItem(this.tokenId);
    let decodedToken = this.jwtHelper.decodeToken(token);
    this.log.d('Token Valid, User Logged In', decodedToken);
    this.user = new User();
    this.user.email = decodedToken.email;
    // TODO After logging user from cache inform other components.
  }

  public logout(): void {
    localStorage.removeItem(this.tokenId);
    this.user = null;
    this.router.navigate(['']);
  }

  public manualLogout(): void {
    this.logout();
    this.alertService.info('Logged Out');
  }

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

  private getUtcDate() : number {
    return new Date().getUTCDate();
  }

}
