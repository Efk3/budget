import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.model';
import { AppLoader } from './app-loader';
import { MainComponent } from './components/main/main.component';
import { DropboxService } from './services/dropbox.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [BrowserModule, AppRouterModule],
  providers: [AppLoader, DropboxService, { provide: 'dropboxClientId', useValue: environment.dropboxClientId }],
  bootstrap: [AppComponent],
})
export class AppModule {}
