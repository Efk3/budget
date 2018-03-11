import { Action } from '@ngrx/store';
import { AuthenticationType } from '../models/authentication-type.model';
import { FailureType } from '../models/failure-type.model';
import { User } from '../models/user.model';

export enum AuthActionTypes {
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
}

export class LoginFailure implements Action {
  public readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: { reason: FailureType }) {}
}

export class LoginSuccess implements Action {
  public readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: User; type: AuthenticationType; accessToken: string }) {}
}

export class Logout implements Action {
  public readonly type = AuthActionTypes.Logout;

  constructor(public payload: any) {}
}

export type AuthActions = LoginSuccess | LoginFailure | Logout;
