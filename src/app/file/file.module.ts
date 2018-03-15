import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from '../auth/auth.module';
import { FileListComponent } from './components/file-list.component';
import { FileComponent } from './components/file.component';
import { reducer } from './reducers/file.reducer';
import { FileService } from './services/file.service';

const components = [FileComponent, FileListComponent];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [...components],
  exports: [...components],
})
export class FileModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootFileModule,
    };
  }
}

@NgModule({
  imports: [FileModule, AuthModule, StoreModule.forFeature('file', reducer), EffectsModule.forFeature([FileService])],
  exports: [FileModule],
})
export class RootFileModule {}
