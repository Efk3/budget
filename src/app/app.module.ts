import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppLoader } from './app-loader';
import { AppRouterModule } from './app-router.model';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ErrorSnackbarComponent } from './common/error-snackbar-component';
import { FileModule } from './file/file.module';
import { MainComponent } from './main/main.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent, MainComponent, ErrorSnackbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRouterModule,
    MaterialModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    AuthModule.forRoot(),
    FileModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 120,
      logOnly: environment.production,
    }),
  ],
  entryComponents: [ErrorSnackbarComponent],
  providers: [
    AppLoader,
    { provide: 'dropboxClientId', useValue: environment.dropboxClientId },
    { provide: 'googleClientId', useValue: environment.googleClientId },
    { provide: 'googleApiKey', useValue: environment.googleApiKey },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
