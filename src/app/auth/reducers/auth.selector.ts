import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const getAccessToken = createSelector(selectAuthState, (state: AuthState) => state.accessToken);
export const getUser = createSelector(selectAuthState, (state: AuthState) => state.user);
export const getLoggedIn = createSelector(selectAuthState, (state: AuthState) => state.loggedIn);
export const getFailure = createSelector(selectAuthState, (state: AuthState) => state.error);
