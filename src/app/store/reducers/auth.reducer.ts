import { User } from '../../domain/user';
import * as fromAuth from '../actions/auth.action';


export interface AuthState {
    user: User;
};

const initialState: AuthState = {
    user: null
};

export function reducer(state = initialState, action: fromAuth.AuthActions ): AuthState {
    switch (action.type) {
        case fromAuth.AuthActionTypes.USER_LOGIN: {
            return {
                ...state
             };
        }
        case fromAuth.AuthActionTypes.USER_LOGIN_SUCCESFUL: {
            return {
                ...state
             };
        }
        case fromAuth.AuthActionTypes.USER_LOGIN_FAIL: {
            return {
                ...state
             };
        }
        case fromAuth.AuthActionTypes.SET_USER_DATA: {
            const user = action.payload;
            return {
                ...state,
                user
             };
        }
        case fromAuth.AuthActionTypes.USER_SYSTEM_LOGOUT: {
            return {
                ...state,
             };
        }
        case fromAuth.AuthActionTypes.USER_MANUAL_LOGOUT: {
            return {
                ...state,
             };
        }
        case fromAuth.AuthActionTypes.USER_LOGGED_OUT: {
            const user = null;
            return {
                ...state,
                user
             };
        }

        default: {
            return state;
        }
    }
}

export const getCurrentUser = (state: AuthState) => state.user;