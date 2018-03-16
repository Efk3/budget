import { Action } from '@ngrx/store';
import { AuthenticationType } from '../models/authentication-type.model';
import { FailureType } from '../models/failure-type.model';
import { User } from '../models/user.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFail = '[Auth] Login Fail',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  LogoutFail = '[Auth] Logout Fail',
}

/**
 * Login actions
 */
export class Login implements Action {
  public readonly type = AuthActionTypes.Login;

  constructor(public payload: { type: AuthenticationType }) {}
}

export class LoginSuccess implements Action {
  public readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: User; type: AuthenticationType; accessToken: string }) {}
}

export class LoginFail implements Action {
  public readonly type = AuthActionTypes.LoginFail;

  constructor(public payload: { reason: FailureType }) {}
}

/**
 * Logout actions
 */
export class Logout implements Action {
  public readonly type = AuthActionTypes.Logout;
  public payload: any;

  constructor() {}
}

export class LogoutSuccess implements Action {
  public readonly type = AuthActionTypes.LogoutSuccess;
  public payload: any;

  constructor() {}
}

export class LogoutFail implements Action {
  public readonly type = AuthActionTypes.LogoutFail;

  constructor(public payload: string = null) {}
}

export type AuthActions = Login | LoginSuccess | LoginFail | Logout | LogoutSuccess | LogoutFail;
