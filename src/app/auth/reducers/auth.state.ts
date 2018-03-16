import { AuthenticationType } from '../models/authentication-type.model';
import { FailureType } from '../models/failure-type.model';
import { User } from '../models/user.model';

export const AUTH_STORAGE_KEYS = {
  type: '@k3/budget/authenticationType',
  accessToken: '@k3/budget/accessToken',
};

export interface AuthState {
  loggedIn: boolean;
  error?: FailureType;
  user?: User;
  accessToken?: string;
  type?: AuthenticationType;
}

export const initialState: AuthState = {
  loggedIn: false,
};
