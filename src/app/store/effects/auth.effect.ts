import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';

import * as authActions from '../actions/auth.action';
import { JwtToken } from './../../domain/jwt-token';
import { LoginService } from './../../services/login/login.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    public movieService: MovieService,
    private loginService: LoginService
  ) {}

  @Effect()
  userLogin: Observable<Action> = this.actions.pipe(
    ofType(authActions.AuthActionTypes.USER_LOGIN),
    mergeMap((action: any) =>
      this.loginService.login(action.payload).pipe(
        tap((token: JwtToken) => {
          this.authService.login(token);
        }),
        map((token: JwtToken) => {
          return {
            type: authActions.AuthActionTypes.USER_LOGIN_SUCCESFUL,
            payload: token
          };
        }),
        catchError(() =>
          of({
            type: authActions.AuthActionTypes.USER_LOGIN_FAIL
          })
        )
      )
    )
  );

  @Effect()
  systemLogout: Observable<Action> = this.actions.pipe(
    ofType(authActions.AuthActionTypes.USER_SYSTEM_LOGOUT),
    tap(() => {
      this.authService.systemLogout();
    }),
    map(() => {
      return { type: authActions.AuthActionTypes.USER_LOGGED_OUT };
    }),
    catchError(() =>
      of({
        type: authActions.AuthActionTypes.USER_LOG_OUT_FAIL
      })
    )
  );

  @Effect()
  manualLogout = this.actions.pipe(
    ofType(authActions.AuthActionTypes.USER_MANUAL_LOGOUT),
    tap(() => {
      this.authService.manualLogout();
    }),
    map(() => {
      return { type: authActions.AuthActionTypes.USER_LOGGED_OUT };
    }),
    catchError(() =>
      of({
        type: authActions.AuthActionTypes.USER_LOG_OUT_FAIL
      })
    )
  );
}
