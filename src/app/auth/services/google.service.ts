import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, NgZone } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';
import { getSnapshot } from '../../utils/get-snapshot';
import { AuthActionTypes, Login, LoginFail, LoginSuccess, LogoutSuccess } from '../actions/auth';
import { AuthenticationType } from '../models/authentication-type.model';
import { FailureType } from '../models/failure-type.model';
import { getAuthenticationInfo } from '../reducers/auth.selector';
import { AUTH_STORAGE_KEYS, AuthState } from '../reducers/auth.state';
import { getAccessTokenFromOAuthUrl } from '../utils/oauth';

@Injectable()
export class GoogleService {
  @Effect({ dispatch: false })
  private loginEffect = this.actions
    .ofType<Login>(AuthActionTypes.Login)
    .pipe(filter(action => action.payload.type === AuthenticationType.GOOGLE), tap(() => this.login()));

  @Effect({ dispatch: false })
  private logoutEffect = this.actions.ofType(AuthActionTypes.Logout).pipe(tap(() => this.logout()));

  constructor(
    @Inject('googleClientId') private clientId: string,
    @Inject('googleApiKey') private apiKey: string,
    private http: HttpClient,
    private store: Store<AuthState>,
    private actions: Actions,
    private ngZone: NgZone
  ) {
    window['drivePopUpCallback'] = url => ngZone.run(() => this.popUpCallBack(url));

    const savedAuthType = localStorage.getItem(AUTH_STORAGE_KEYS.type);
    const savedAccessToken = localStorage.getItem(AUTH_STORAGE_KEYS.accessToken);

    if (savedAuthType && AuthenticationType[savedAuthType] === AuthenticationType.GOOGLE && savedAccessToken) {
      this.checkToken(savedAccessToken, false);
    }
  }

  private async login(): Promise<void> {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    const url =
      `https://accounts.google.com/o/oauth2/v2/auth?scope=` +
      `https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile` +
      `&redirect_uri=${baseUrl}redirect-from-google.html&response_type=token&client_id=${this.clientId}`;
    window.open(url, null, 'scrollbars=no,width=690,height=620');
  }

  private popUpCallBack(url: Location) {
    try {
      this.checkToken(getAccessTokenFromOAuthUrl(url));
    } catch (err) {
      this.store.dispatch(new LoginFail({ reason: err }));
    }
  }

  private async checkToken(accessToken: string, dispatchFailure: boolean = true): Promise<void> {
    try {
      const user = await this.http
        .get<any>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
        .toPromise();
      this.store.dispatch(new LoginSuccess({ user: { name: user.given_name }, accessToken, type: AuthenticationType.GOOGLE }));
    } catch (err) {
      if (dispatchFailure) {
        this.store.dispatch(new LoginFail({ reason: FailureType.INVALID_TOKEN }));
      }
    }
  }

  private async logout() {
    const authInfo = await getSnapshot(this.store.select(getAuthenticationInfo));

    if (!authInfo || authInfo.type !== AuthenticationType.GOOGLE) {
      return;
    }

    // Google API doesn't allow cross origin request for revoke so we simply drop the token
    this.store.dispatch(new LogoutSuccess());
  }
}
