import { User } from './../../domain/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';


@Component({
  selector: 'moviesapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loader: boolean = false;

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

  constructor(private store: Store<fromStore.MoviesState>,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
  this.store.select(fromStore.getCurrentUser)
    .subscribe(
      (user: User) => {
        if(user != null) {
          this.router.navigate(['/list']);
        }
      }
    )
  }

  public onLogin(): void {
    this.loader = true;
    this.store.dispatch(new fromStore.UserLogin(this.loginForm.value));
  }
}