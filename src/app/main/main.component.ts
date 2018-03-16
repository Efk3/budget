import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Login, Logout } from '../auth/actions/auth';
import { AuthenticationType } from '../auth/models/authentication-type.model';
import { getFailure, getLoggedIn, getUser } from '../auth/reducers/auth.selector';
import { AuthState } from '../auth/reducers/auth.state';

@Component({
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  public loggedIn = this.store.select(getLoggedIn);
  public user = this.store.select(getUser);
  public failure = this.store.select(getFailure);

  constructor(public store: Store<AuthState>) {}

  public ngOnInit(): void {}

  public dropboxLogin() {
    this.store.dispatch(new Login({ type: AuthenticationType.DROPBOX }));
  }

  public googleLogin() {
    this.store.dispatch(new Login({ type: AuthenticationType.GOOGLE }));
  }

  public logout() {
    this.store.dispatch(new Logout());
  }
}
