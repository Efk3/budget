import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/auth.reducer';
import { DropboxService } from './services/dropbox.service';
import { GoogleService } from './services/google.service';

@NgModule({})
export class AuthModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
    };
  }
}

@NgModule({
  imports: [AuthModule, StoreModule.forFeature('auth', reducer), EffectsModule.forFeature([DropboxService, GoogleService])],
})
export class RootAuthModule {}
