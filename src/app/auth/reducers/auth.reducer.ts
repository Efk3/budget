import { AuthActions, AuthActionTypes } from '../actions/auth';
import { AUTH_STORAGE_KEY, AuthState, initialState } from './auth.state';

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      if (action.payload.accessToken) {
        localStorage.setItem(AUTH_STORAGE_KEY, action.payload.accessToken);
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }

      return {
        ...state,
        error: undefined,
        loggedIn: true,
        user: action.payload.user,
        type: action.payload.type,
        accessToken: action.payload.accessToken,
      };
    }

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        error: action.payload.reason,
      };
    }

    case AuthActionTypes.Logout: {
      localStorage.removeItem(AUTH_STORAGE_KEY);

      return initialState;
    }

    default: {
      return state;
    }
  }
}
