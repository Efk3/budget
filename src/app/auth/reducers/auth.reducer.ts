import { AuthActions, AuthActionTypes } from '../actions/auth';
import { AUTH_STORAGE_KEYS, AuthState, initialState } from './auth.state';

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      localStorage.setItem(AUTH_STORAGE_KEYS.type, action.payload.type.toString());
      localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, action.payload.accessToken);

      return {
        ...state,
        error: undefined,
        loggedIn: true,
        user: action.payload.user,
        type: action.payload.type,
        accessToken: action.payload.accessToken,
      };
    }

    case AuthActionTypes.LoginFail: {
      return {
        ...state,
        error: action.payload.reason,
      };
    }

    case AuthActionTypes.LogoutSuccess:
    case AuthActionTypes.LogoutFail: {
      localStorage.removeItem(AUTH_STORAGE_KEYS.type);
      localStorage.removeItem(AUTH_STORAGE_KEYS.accessToken);

      return initialState;
    }

    default: {
      return state;
    }
  }
}
