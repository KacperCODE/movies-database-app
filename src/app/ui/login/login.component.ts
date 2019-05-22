import { JwtToken } from './../../domain/jwt-token';
import { AuthService } from './../../services/auth/auth.service';
import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Log } from 'ng2-logger/client';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'moviesapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private log = Log.create('LoginComponent');

  loginForm = this.formBuilder.group({
    login: ['', [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(35)]],
    password: ['', [
        Validators.required, 
        Validators.minLength(5),
        Validators.maxLength(35)]]
  })

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private authService: AuthService,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit() {
  }

  public onLogin(): void {
    const { login, password } = this.loginForm.value;

    this.loginService.login(login, password)
      .subscribe(
        (token: JwtToken) => {
          this.authService.login(token);
          this.router.navigate(['/list']);
          this.alertService.info('Logged In');
        },
        (error) => {
          this.alertService.warning('Incorrect email/password');
          this.log.er("Incorrect email/password", error);
        }
      )
  }
}
