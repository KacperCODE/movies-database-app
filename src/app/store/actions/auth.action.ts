import { Action } from '@ngrx/store';

import { Credentials } from './../../domain/credentials';
import { JwtToken } from './../../domain/jwt-token';
import { User } from './../../domain/user';

export enum AuthActionTypes {
  USER_LOGIN = "[AUTH] Log in",
  USER_LOGIN_SUCCESFUL = "[AUTH] Login succesful",
  USER_LOGIN_FAIL = "[AUTH] Login fail",
  SET_USER_DATA = "[AUTH] Set User Data",

  USER_SYSTEM_LOGOUT = "[AUTH] User automaticaly logged out",
  USER_MANUAL_LOGOUT = "[AUTH] User manually logged out",
  USER_LOGGED_OUT = "[AUTH] User logged out",
  USER_LOG_OUT_FAIL = "[AUTH] User can't log out"
}

export class UserLogin implements Action {
  readonly type = AuthActionTypes.USER_LOGIN;

  constructor(public payload: Credentials) {}
}
export class UserLoginSuccesful implements Action {
  readonly type = AuthActionTypes.USER_LOGIN_SUCCESFUL;

  constructor(public payload: JwtToken) {}
}
export class UserLoginFail implements Action {
  readonly type = AuthActionTypes.USER_LOGIN_FAIL;
}
export class SetUserData implements Action {
  readonly type = AuthActionTypes.SET_USER_DATA;

  constructor(public payload: User) {}
}
export class UserSystemLogout implements Action {
  readonly type = AuthActionTypes.USER_SYSTEM_LOGOUT;

  constructor() {}
}

export class UserManualLogout implements Action {
  readonly type = AuthActionTypes.USER_MANUAL_LOGOUT;

  constructor() {}
}
export class UserLoggedOut implements Action {
  readonly type = AuthActionTypes.USER_LOGGED_OUT;

  constructor() {}
}
export class UserLogOutFail implements Action {
  readonly type = AuthActionTypes.USER_LOG_OUT_FAIL;

  constructor() {}
}

export type AuthActions =
  | UserLogin
  | UserLoginSuccesful
  | UserLoginFail
  | SetUserData
  | UserSystemLogout
  | UserManualLogout
  | UserLoggedOut
  | UserLogOutFail;
