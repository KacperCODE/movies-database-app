import { AuthService } from "./../../services/auth/auth.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (!this.authService.isJwtValid(null)) {
      this.router.navigate([""]);
      return false;
    }

    return true;
  }
}
