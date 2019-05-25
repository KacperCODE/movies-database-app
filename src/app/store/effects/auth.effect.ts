import { JwtToken } from './../../domain/jwt-token';
import { LoginService } from './../../services/login/login.service';
import { Actor } from '../../domain/actor';
import * as authActions from '../actions/auth.action';
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Movie } from 'src/app/domain/movie';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authService: AuthService, private loginService: LoginService) {}

  @Effect()
  userLogin = this.actions.pipe(
    ofType(authActions.AuthActionTypes.USER_LOGIN),
    mergeMap((action: any) =>
      this.loginService.login(action.payload).pipe(
        map((token: JwtToken) => {
            this.authService.login(token);
            return ({type: authActions.AuthActionTypes.USER_LOGIN_SUCCESFUL, payload: token })
          }
        ),
        catchError(() =>
          of({
            type:
            authActions.AuthActionTypes
                .USER_LOGIN_FAIL
          })
        )
      )
    )
  );

  @Effect()
  systemLogout = this.actions.pipe(
    ofType(authActions.AuthActionTypes.USER_SYSTEM_LOGOUT),
      map(() => {
          this.authService.systemLogout()
          return ({ type: authActions.AuthActionTypes.USER_LOGGED_OUT })
        }
      )
  );

  @Effect()
  manualLogout = this.actions.pipe(
    ofType(authActions.AuthActionTypes.USER_MANUAL_LOGOUT),
      map(() => {
          this.authService.manualLogout()
          return ({ type: authActions.AuthActionTypes.USER_LOGGED_OUT })
        }
      )
  );
}
