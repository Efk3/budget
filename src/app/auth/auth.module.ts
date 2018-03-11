import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/auth.reducer';
import { DropboxService } from './services/dropbox.service';

@NgModule({})
export class AuthModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
    };
  }
}

@NgModule({
  imports: [AuthModule, StoreModule.forFeature('auth', reducer)],
  providers: [DropboxService],
})
export class RootAuthModule {}
