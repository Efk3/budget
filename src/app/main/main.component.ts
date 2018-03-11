import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '../auth/actions/auth';
import { getFailure, getLoggedIn, getUser } from '../auth/reducers/auth.selector';
import { AuthState } from '../auth/reducers/auth.state';
import { DropboxService } from '../auth/services/dropbox.service';

@Component({
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  public loggedIn = this.store.select(getLoggedIn);
  public user = this.store.select(getUser);
  public failure = this.store.select(getFailure);

  constructor(public store: Store<AuthState>, private dropboxService: DropboxService) {}

  public ngOnInit(): void {}

  public dropboxLogin() {
    this.dropboxService.login();
  }

  public logout() {
    this.store.dispatch(new Logout(null));
  }
}
