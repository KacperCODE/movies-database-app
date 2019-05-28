import { User } from 'src/app/domain/user';

import { JwtToken } from './../../domain/jwt-token';
import {
  AuthActionTypes,
  SetUserData,
  UserLoggedOut,
  UserLogin,
  UserLoginFail,
  UserLoginSuccesful,
  UserLogOutFail,
  UserManualLogout,
  UserSystemLogout,
} from './auth.action';

describe("AuthActions", () => {
  it("should create UserLogin action", () => {
    const action = new UserLogin({
      login: "user",
      password: "password"
    });

    expect(action.type).toEqual(AuthActionTypes.USER_LOGIN);
    expect(action.payload).toEqual(
      jasmine.objectContaining({
        login: "user",
        password: "password"
      })
    );
  });

  it("should create UserLoginSuccesful action", () => {
    const action = new UserLoginSuccesful(new JwtToken("token_string"));

    expect(action.type).toEqual(AuthActionTypes.USER_LOGIN_SUCCESFUL);
    expect(action.payload).toEqual(new JwtToken("token_string"));
  });

  it("should create UserLoginFail action", () => {
    const action = new UserLoginFail();

    expect(action.type).toEqual(AuthActionTypes.USER_LOGIN_FAIL);
  });

  it("should create SetUserData action", () => {
    const action = new SetUserData(new User("user@user.com"));

    expect(action.type).toEqual(AuthActionTypes.SET_USER_DATA);
    expect(action.payload).toEqual(new User("user@user.com"));
  });

  it("should create UserSystemLogout action", () => {
    const action = new UserSystemLogout();

    expect(action.type).toEqual(AuthActionTypes.USER_SYSTEM_LOGOUT);
  });

  it("should create UserManualLogout action", () => {
    const action = new UserManualLogout();

    expect(action.type).toEqual(AuthActionTypes.USER_MANUAL_LOGOUT);
  });

  it("should create UserLoggedOut action", () => {
    const action = new UserLoggedOut();

    expect(action.type).toEqual(AuthActionTypes.USER_LOGGED_OUT);
  });

  it("should create UserLogOutFail action", () => {
    const action = new UserLogOutFail();

    expect(action.type).toEqual(AuthActionTypes.USER_LOG_OUT_FAIL);
  });
});
