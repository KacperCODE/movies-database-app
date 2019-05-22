import { JwtToken } from './../../domain/jwt-token';
import { AuthService } from './../../services/auth/auth.service';
import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'moviesapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
              private authService: AuthService) { }

  ngOnInit() {
  }

  public onLogin(): void {
    const { login, password } = this.loginForm.value;

    this.loginService.login(login, password)
      .subscribe(
        (token: JwtToken) => {
          this.authService.login(token);
        }
      )
  }
}
