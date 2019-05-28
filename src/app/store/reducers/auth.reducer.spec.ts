import {
  SetUserData,
  UserLoggedOut,
  UserLogin,
  UserLoginFail,
  UserLoginSuccesful,
  UserLogOutFail,
  UserManualLogout,
  UserSystemLogout
} from "../actions/auth.action";
import { JwtToken } from "./../../domain/jwt-token";
import { User } from "./../../domain/user";
import * as fromAuth from "./auth.reducer";

describe("AuthReducer", () => {
  let initialState: fromAuth.AuthState;
  let state: fromAuth.AuthState;
  const reducer = fromAuth.reducer;

  beforeEach(() => {
    initialState = {
      user: null,
      isLoading: false
    };
    state = { ...initialState };
  });

  it("default case should not modify state", () => {
    const action: any = {};

    state = reducer(state, action);

    expect(state).toEqual(initialState);
  });

  it("UserLogin action should set isLoading to tru", () => {
    const action = new UserLogin({
      login: "user@user.com",
      password: "password"
    });

    state = reducer(state, action);

    expect(state).not.toEqual(initialState);
    expect(state.isLoading).toBeTruthy();
  });

  it("UserLoginSuccesful action should set isLoading to false", () => {
    const action = new UserLoginSuccesful(new JwtToken("token"));

    state = reducer(state, action);

    expect(state).toEqual(initialState);
    expect(state.isLoading).toBeFalsy();
  });

  it("UserLoginFail action should set isLoading to false", () => {
    const action = new UserLoginFail();

    state = reducer(state, action);

    expect(state).toEqual(initialState);
    expect(state.isLoading).toBeFalsy();
  });

  it("SetUserData action should modify state with user data", () => {
    const action = new SetUserData(new User("user@user.com"));

    state = reducer(state, action);

    expect(state).not.toEqual(initialState);
    expect(state.user).toEqual(action.payload);
  });

  it("UserSystemLogout action should not modify state", () => {
    const action = new UserSystemLogout();

    state = reducer(state, action);

    expect(state).toEqual(initialState);
  });

  it("UserManualLogout action should not modify state", () => {
    const action = new UserManualLogout();

    state = reducer(state, action);

    expect(state).toEqual(initialState);
  });

  it("UserLoggedOut action should remove user from state", () => {
    const action = new UserLoggedOut();
    const user = new User("user@user.com");
    initialState = { ...state, user };

    state = reducer(state, action);

    expect(state).not.toEqual(initialState);
    expect(state.user).toBeNull();
  });

  it("UserLogOutFail action should not modify state", () => {
    const action = new UserLogOutFail();
    state = reducer(state, action);

    expect(state).toEqual(initialState);
  });
});
