import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { FileModule } from './file/file.module';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouterModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    AuthModule.forRoot(),
    FileModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 120,
      logOnly: environment.production,
    }),
  ],
  providers: [AppLoader, DropboxService, { provide: 'dropboxClientId', useValue: environment.dropboxClientId }],
  bootstrap: [AppComponent],
})
export class AppModule {}
