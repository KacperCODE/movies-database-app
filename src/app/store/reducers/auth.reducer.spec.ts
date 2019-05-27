import * as fromAuth from './auth.reducer';

import {
    UserLogin,
    UserLoginSuccesful,
    UserLoginFail,
    SetUserData,
    UserSystemLogout,
    UserManualLogout,
    UserLoggedOut,
    UserLogOutFail
  } from "../actions/auth.action";
import { JwtToken } from 'src/app/domain/jwt-token';
import { User } from 'src/app/domain/user';

describe('AuthReducer', () => {
    let initialState: fromAuth.AuthState;
    let state: fromAuth.AuthState;
    const reducer = fromAuth.reducer;
    
    beforeEach(() => {
        initialState  = {
            user: null
        }
        state = {...initialState};
    })

    it('default case should not modify state', () => {
        const action: any = {};
        
        state = reducer(state, action);
        
        expect(state).toEqual(initialState);
    })
  
    it('UserLogin action should not modify state', () => {
        const action = new UserLogin({
            login: 'user@user.com',
            password: 'password'
        })

        state = reducer(state, action);

        expect(state).toEqual(initialState);
    });

    it('UserLoginSuccesful action should not modify state', () => {
        const action = new UserLoginSuccesful(new JwtToken('token'));

        state = reducer(state, action);

        expect(state).toEqual(initialState);
    });

    it('UserLoginFail action should not modify state', () => {
        const action = new UserLoginFail();

        state = reducer(state, action);

        expect(state).toEqual(initialState);
    });

    it('SetUserData action should modify state with user data', () => {
        const action = new SetUserData(new User('user@user.com'));

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.user).toEqual(action.payload);
    });
    
    it('UserSystemLogout action should not modify state', () => {
        const action = new UserSystemLogout();

        state = reducer(state, action);

        expect(state).toEqual(initialState);
    });
    
    it('UserManualLogout action should not modify state', () => {
        const action = new UserManualLogout();

        state = reducer(state, action);

        expect(state).toEqual(initialState);
    });

    it('UserLoggedOut action should remove user from state', () => {
        const action = new UserLoggedOut();
        const user = new User('user@user.com');
        initialState = {...state, user};

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.user).toBeNull();
    });
    
    it('UserLogOutFail action should not modify state', () => {
        const action = new UserLogOutFail();
        state = reducer(state, action);

        expect(state).toEqual(initialState);
    });
});