import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from './auth/actions/auth';
import { getUser } from './auth/reducers/auth.selector';
import { AuthState } from './auth/reducers/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public user = this.store.select(getUser);

  constructor(private store: Store<AuthState>) {}

  public logout() {
    this.store.dispatch(new Logout());
  }
}
