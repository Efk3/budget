import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {
  CreateFileFail,
  CreateFileSuccess,
  GetFileFail,
  GetFilesSuccess,
  GetFileSuccess,
  RemoveFileFail,
  RemoveFileSuccess,
  RenameFileFail,
  RenameFileSuccess,
  SaveFileFail,
  SaveFileSuccess,
} from '../actions/file.action';
import { BudgetFile } from '../models/budget-file.model';
import { FileState } from '../reducers/file.state';
import { FileHandler } from './file-handler.interface';

export class GoogleFileHandler implements FileHandler {
  public ready: Observable<boolean>;
  private readonly directoryName: string = 'K3 Budget';
  private directoryId: string;
  private readySubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private fileStore: Store<FileState>, private accessToken: string) {
    this.ready = this.readySubject.asObservable();
    this.getDirectoryId();
  }

  public async list() {
    try {
      const result = await this.http
        .get<any>(`https://www.googleapis.com/drive/v3/files`, {
          params: { pageSize: '999', fields: 'files(id, name)', q: `"${this.directoryId}" in parents` },
          headers: this.getHeader(),
        })
        .toPromise();

      this.fileStore.dispatch(
        new GetFilesSuccess({
          files: result.files.map(entry => {
            return { id: entry.id, name: entry.name };
          }),
        })
      );
    } catch (err) {
      // @TODO: handle error
    }
  }

  public async get(file: BudgetFile) {
    try {
      const content = await this.http
        .get(`https://www.googleapis.com/drive/v3/files/${file.id}`, {
          responseType: 'text',
          params: { alt: 'media' },
          headers: this.getHeader(),
        })
        .toPromise();

      this.fileStore.dispatch(new GetFileSuccess({ file, content }));
    } catch (err) {
      this.fileStore.dispatch(new GetFileFail('Can not download file'));
    }
  }

  public async create(name: string) {
    try {
      const file = await this.http
        .post<any>(
          `https://www.googleapis.com/drive/v3/files`,
          { name, parents: [this.directoryId], fields: 'id' },
          { headers: this.getHeader() }
        )
        .toPromise();

      this.fileStore.dispatch(new CreateFileSuccess(new BudgetFile(file.id, name)));
    } catch (err) {
      this.fileStore.dispatch(new CreateFileFail(name));
    }
  }

  public async remove(file: BudgetFile) {
    try {
      await this.http.delete(`https://www.googleapis.com/drive/v3/files/${file.id}`, { headers: this.getHeader() }).toPromise();

      this.fileStore.dispatch(new RemoveFileSuccess(file));
    } catch (err) {
      this.fileStore.dispatch(new RemoveFileFail(file));
    }
  }

  public async rename(file: BudgetFile, newName: string) {
    try {
      await this.http
        .patch(`https://www.googleapis.com/drive/v3/files/${file.id}`, { name: newName }, { headers: this.getHeader() })
        .toPromise();

      this.fileStore.dispatch(new RenameFileSuccess({ file, newName }));
    } catch (err) {
      this.fileStore.dispatch(new RenameFileFail({ file, newName }));
    }
  }

  public async save(file: BudgetFile, newContent: string) {
    try {
      await this.http
        .patch(`https://www.googleapis.com/upload/drive/v3/files/${file.id}`, newContent, {
          params: { uploadType: 'media' },
          headers: this.getHeader(),
        })
        .toPromise();

      this.fileStore.dispatch(new SaveFileSuccess(file));
    } catch (err) {
      this.fileStore.dispatch(new SaveFileFail(file));
    }
  }

  private async getDirectoryId() {
    try {
      // check budget directory
      const result = await this.http
        .get<any>(`https://www.googleapis.com/drive/v3/files`, {
          params: { pageSize: '1', fields: 'files(id)', q: `name = "${this.directoryName}" and trashed = false` },
          headers: this.getHeader(),
        })
        .toPromise();

      if (result.files.length === 1) {
        // found
        this.directoryId = result.files[0].id;
      } else {
        // directory does not exist, create it
        const createDirectory = await this.http
          .post<any>(
            `https://www.googleapis.com/drive/v3/files`,
            { name: this.directoryName, mimeType: 'application/vnd.google-apps.folder', fields: 'id' },
            { headers: this.getHeader() }
          )
          .toPromise();

        this.directoryId = createDirectory.id;
      }

      this.readySubject.next(true);
    } catch (err) {
      // @TODO: handle error
    }
  }

  private getHeader() {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
  }
}
