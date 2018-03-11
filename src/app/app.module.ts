import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppLoader } from './app-loader';
import { AppRouterModule } from './app-router.model';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DropboxService } from './auth/services/dropbox.service';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRouterModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    AuthModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 120,
      logOnly: environment.production,
    }),
  ],
  providers: [AppLoader, DropboxService, { provide: 'dropboxClientId', useValue: environment.dropboxClientId }],
  bootstrap: [AppComponent],
})
export class AppModule {}
