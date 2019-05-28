import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as fromStore from "../../store";
import { Credentials } from "./../../domain/credentials";
import { User } from "./../../domain/user";

@Component({
  selector: "moviesapp-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  public loader: boolean = false;
  private subscriptions: Subscription = new Subscription();

  loginForm = this.formBuilder.group({
    login: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(35)]
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(35)]
    ]
  });

  constructor(
    private store: Store<fromStore.MoviesState>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  public subscribeToCurrentUser(): void {
    this.subscriptions.add(
      this.store.select(fromStore.getCurrentUser).subscribe((user: User) => {
        if (user != null) {
          this.router.navigate(["/list"]);
        }
      })
    );
  }

  public onLogin(): void {
    const credentials: Credentials = this.loginForm.value;
    this.store.dispatch(new fromStore.UserLogin(credentials));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
