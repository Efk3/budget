import { Inject, Injectable, NgZone } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Dropbox } from 'dropbox';
import { getQueryParams } from '../../utils/get-query-params';
import { LoginFailure, LoginSuccess } from '../actions/auth';
import { AuthenticationType } from '../models/authentication-type.model';
import { FailureType } from '../models/failure-type.model';
import { AUTH_STORAGE_KEY, AuthState } from '../reducers/auth.state';

@Injectable()
export class DropboxService {
  private dropboxClient: Dropbox;

  constructor(
    @Inject('dropboxClientId') private clientId: string,
    private ngZone: NgZone,
    private store: Store<AuthState>,
    private actions: Actions
  ) {
    this.dropboxClient = new Dropbox({ clientId: this.clientId });

    window['popupCallback'] = url => ngZone.run(() => this.popUpCallBack(url));

    if (localStorage.getItem(AUTH_STORAGE_KEY)) {
      this.checkToken(localStorage.getItem(AUTH_STORAGE_KEY), false);
    }
  }

  public login(): void {
    this.openPopUp();
  }

  public async logout() {
    // @TODO: revoke token
  }

  private async checkToken(accessToken: string, dispatchFailure: boolean = true): Promise<void> {
    try {
      const userDropbox = new Dropbox({ accessToken });
      const user = await userDropbox.usersGetCurrentAccount(null);
      this.store.dispatch(new LoginSuccess({ user: { name: user.name.given_name }, accessToken, type: AuthenticationType.DROPBOX }));
    } catch (err) {
      if (dispatchFailure) {
        this.store.dispatch(new LoginFailure({ reason: FailureType.INVALID_TOKEN }));
      }
    }
  }

  private openPopUp() {
    const url = document.getElementsByTagName('base')[0].href;
    window.open(this.dropboxClient.getAuthenticationUrl(`${url}dropbox-redirect.html`), null, 'scrollbars=no,width=690,height=420');
  }

  private popUpCallBack(url: Location) {
    const queryParams = getQueryParams(url.href);
    const accessToken = url.href.match(/access_token=([^&]*)/);

    if (queryParams['error'] === 'access_denied') {
      this.store.dispatch(new LoginFailure({ reason: FailureType.ACCESS_DENIED }));
    } else if (accessToken) {
      this.checkToken(accessToken[1]);
    } else {
      this.store.dispatch(new LoginFailure({ reason: FailureType.MISSING_TOKEN }));
    }
  }
}
