import { Inject, Injectable, NgZone } from '@angular/core';
import * as DropboxTypes from 'dropbox';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Dropbox = DropboxTypes.Dropbox;

@Injectable()
export class DropboxService {
  public user = new BehaviorSubject<any>(null);
  private dropboxClient: Dropbox;
  private accessToken: string;
  private signedIn = new Subject<void>();
  private readonly localStorageKey = '@k3/budget/accessToken';

  constructor(@Inject('dropboxClientId') private clientId: string, private ngZone: NgZone) {
    this.dropboxClient = new Dropbox({ clientId: this.clientId });
    window['popupCallback'] = url => {
      ngZone.run(() => {
        const accessToken = url.href.match(/access_token=([^&]*)/);
        if (accessToken) {
          this.setAccessToken(accessToken[1]);
          this.checkToken(false);
        } else {
          this.signedIn.error('Can not retrieve access token');
        }

        this.completeEmitter();
      });
    };

    this.accessToken = localStorage.getItem(this.localStorageKey);
    if (this.accessToken) {
      this.checkToken(false);
    }
  }

  public login(): Observable<void> {
    if (this.accessToken) {
      this.checkToken();
    } else {
      this.openPopUp();
    }

    return this.signedIn;
  }

  public async logout() {
    if (this.user.value) {
      const userDropbox = new Dropbox({ accessToken: this.accessToken });
      await userDropbox.authTokenRevoke(null);
      this.user.next(null);
      this.setAccessToken(null);
    }
  }

  private async checkToken(popUp: boolean = true) {
    try {
      const userDropbox = new Dropbox({ accessToken: this.accessToken });
      const user = await userDropbox.usersGetCurrentAccount(null);
      this.user.next(user);
      this.signedIn.next();
      this.completeEmitter();
    } catch (err) {
      this.setAccessToken(null);
      this.user.next(null);
      if (popUp) {
        this.openPopUp();
      }
    }
  }

  private openPopUp() {
    const url = document.getElementsByTagName('base')[0].href;
    window.open(this.dropboxClient.getAuthenticationUrl(`${url}dropbox-redirect.html`), null, 'scrollbars=no,width=690,height=420');
  }

  private completeEmitter() {
    this.signedIn.complete();
    this.signedIn = new Subject<void>();
  }

  private setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    accessToken ? localStorage.setItem(this.localStorageKey, accessToken) : localStorage.removeItem(this.localStorageKey);
  }
}
