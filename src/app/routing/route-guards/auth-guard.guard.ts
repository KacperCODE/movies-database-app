import { AlertService } from 'ngx-alerts';
import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router,
              private authService: AuthService) { }

  canActivate() {
    if(!this.authService.isJwtValid(null)) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
