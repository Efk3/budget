import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Login } from '../auth/actions/auth';
import { AuthenticationType } from '../auth/models/authentication-type.model';
import { getFailure, getLoggedIn, getUser } from '../auth/reducers/auth.selector';
import { AuthState } from '../auth/reducers/auth.state';
import { ErrorSnackbarComponent } from '../common/error-snackbar-component';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public loggedIn = this.store.select(getLoggedIn);
  public user = this.store.select(getUser);
  private failureSubscription: Subscription;

  constructor(public store: Store<AuthState>, private snackBar: MatSnackBar) {}

  public ngOnInit(): void {
    this.failureSubscription = this.store
      .select(getFailure)
      .pipe(filter(failure => !!failure))
      .subscribe(() => {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          duration: 3000,
          data: 'Oh no! The login failed.',
        });
      });
  }

  public ngOnDestroy() {
    if (this.failureSubscription) {
      this.failureSubscription.unsubscribe();
    }
  }

  public dropboxLogin() {
    this.store.dispatch(new Login({ type: AuthenticationType.DROPBOX }));
  }

  public googleLogin() {
    this.store.dispatch(new Login({ type: AuthenticationType.GOOGLE }));
  }
}
