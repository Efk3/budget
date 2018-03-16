import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { switchMap, takeWhile, tap } from 'rxjs/operators';
import { AuthActionTypes } from '../../auth/actions/auth';
import { AuthenticationType } from '../../auth/models/authentication-type.model';
import { getAuthenticationInfo } from '../../auth/reducers/auth.selector';
import { AuthState } from '../../auth/reducers/auth.state';
import { Clear, CreateFile, FileActionTypes, GetFile, RemoveFile, RenameFile, SaveFile } from '../actions/file.action';
import { BudgetFile } from '../models/budget-file.model';
import { FileState } from '../reducers/file.state';
import { DropboxFileHandler } from './dropbox-file-handler';
import { FileHandler } from './file-handler.interface';
import { GoogleFileHandler } from './google-file-handler';

@Injectable()
export class FileService {
  @Effect({ dispatch: false })
  private getFilesEffect = this.actions.ofType(FileActionTypes.GetFiles).pipe(tap(() => this.list()));

  @Effect({ dispatch: false })
  private getFileEffect = this.actions.ofType<GetFile>(FileActionTypes.GetFile).pipe(tap(action => this.get(action.payload)));

  @Effect({ dispatch: false })
  private createFileEffect = this.actions.ofType<CreateFile>(FileActionTypes.CreateFile).pipe(tap(action => this.create(action.payload)));

  @Effect({ dispatch: false })
  private saveFileEffect = this.actions
    .ofType<SaveFile>(FileActionTypes.SaveFile)
    .pipe(tap(action => this.save(action.payload.file, action.payload.newContent)));

  @Effect({ dispatch: false })
  private deleteFileEffect = this.actions.ofType<RemoveFile>(FileActionTypes.RemoveFile).pipe(tap(action => this.remove(action.payload)));

  @Effect({ dispatch: false })
  private renameFileEffect = this.actions
    .ofType<RenameFile>(FileActionTypes.RenameFile)
    .pipe(tap(action => this.rename(action.payload.file, action.payload.newName)));

  @Effect()
  private logoutEffect = this.actions
    .ofType(AuthActionTypes.LogoutSuccess, AuthActionTypes.LogoutFail)
    .pipe(switchMap(() => of(new Clear())));

  private fileHandler: FileHandler;
  private ready: boolean = false;

  constructor(
    private authStore: Store<AuthState>,
    private fileStore: Store<FileState>,
    private actions: Actions,
    private http: HttpClient
  ) {
    this.authStore.select(getAuthenticationInfo).subscribe(authenticationInfo => {
      if (authenticationInfo.accessToken) {
        switch (authenticationInfo.type) {
          case AuthenticationType.DROPBOX:
            this.fileHandler = new DropboxFileHandler(this.http, this.fileStore, authenticationInfo.accessToken);
            break;
          case AuthenticationType.GOOGLE:
            this.fileHandler = new GoogleFileHandler(this.http, this.fileStore, authenticationInfo.accessToken);
            break;
        }

        if (this.fileHandler) {
          this.fileHandler.ready.pipe(takeWhile(ready => !ready)).subscribe(null, null, () => {
            this.ready = true;
            this.fileHandler.list();
          });
        }
      } else {
        this.fileHandler = undefined;
      }
    });
  }

  private list() {
    if (!this.isFileHandlerReady()) {
      return;
    }

    this.fileHandler.list();
  }

  private get(file: BudgetFile) {
    if (!this.isFileHandlerReady()) {
      return;
    }

    this.fileHandler.get(file);
  }

  private create(name: string) {
    if (!this.isFileHandlerReady()) {
      return;
    }

    this.fileHandler.create(name);
  }

  private save(file: BudgetFile, newContent: string) {
    if (!this.isFileHandlerReady()) {
      return;
    }

    this.fileHandler.save(file, newContent);
  }

  private remove(file: BudgetFile) {
    if (!this.isFileHandlerReady()) {
      return;
    }

    this.fileHandler.remove(file);
  }

  private rename(file: BudgetFile, newName: string) {
    if (!this.isFileHandlerReady()) {
      return;
    }

    this.fileHandler.rename(file, newName);
  }

  private isFileHandlerReady() {
    return this.fileHandler && this.ready;
  }
}
