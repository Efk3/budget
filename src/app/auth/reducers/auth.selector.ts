import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationType } from '../models/authentication-type.model';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const getAccessToken = createSelector(selectAuthState, (state: AuthState) => state.accessToken);
export const getAuthenticationType = createSelector(selectAuthState, (state: AuthState) => state.type);
export const getUser = createSelector(selectAuthState, (state: AuthState) => state.user);
export const getLoggedIn = createSelector(selectAuthState, (state: AuthState) => state.loggedIn);
export const getFailure = createSelector(selectAuthState, (state: AuthState) => state.error);
export const getAuthenticationInfo = createSelector(
  getAccessToken,
  getAuthenticationType,
  (accessToken: string, type: AuthenticationType) => {
    return { accessToken, type };
  }
);
