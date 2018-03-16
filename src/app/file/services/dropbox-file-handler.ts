import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Dropbox } from 'dropbox';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  CreateFileFail,
  CreateFileSuccess,
  GetFileFail,
  GetFilesFail,
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
import FileMetadataReference = DropboxTypes.files.FileMetadataReference;

export class DropboxFileHandler implements FileHandler {
  public ready: Observable<boolean> = of(true);
  private client: Dropbox;

  constructor(private http: HttpClient, private fileStore: Store<FileState>, accessToken: string) {
    this.client = new Dropbox({ accessToken });
  }

  public async list() {
    try {
      const dropboxFiles = await this.client.filesListFolder({ path: '' });
      const files = dropboxFiles.entries.map((entry: FileMetadataReference) => {
        return { id: entry.id, name: entry.name };
      });
      this.fileStore.dispatch(new GetFilesSuccess({ files: files }));
    } catch (error) {
      this.fileStore.dispatch(new GetFilesFail({ message: 'Can not get files', error }));
    }
  }

  public async get(file: BudgetFile) {
    try {
      const link = await this.client.filesGetTemporaryLink({ path: `/${file.name}` });
      const content = await this.http.get(link.link, { responseType: 'text' }).toPromise();
      this.fileStore.dispatch(new GetFileSuccess({ file, content }));
    } catch (err) {
      this.fileStore.dispatch(new GetFileFail('Can not download file'));
    }
  }

  public async create(name: string) {
    try {
      const file = await this.client.filesUpload({ path: `/${name}`, contents: '' });
      this.fileStore.dispatch(new CreateFileSuccess(new BudgetFile(file.id, name)));
    } catch (err) {
      this.fileStore.dispatch(new CreateFileFail(name));
    }
  }

  public async remove(file: BudgetFile) {
    try {
      await this.client.filesDeleteV2({ path: `/${file.name}` });
      this.fileStore.dispatch(new RemoveFileSuccess(file));
    } catch (err) {
      this.fileStore.dispatch(new RemoveFileFail(file));
    }
  }

  public async rename(file: BudgetFile, newName: string) {
    try {
      await this.client.filesMoveV2({ from_path: `/${file.name}`, to_path: `/${newName}` });
      this.fileStore.dispatch(new RenameFileSuccess({ file: file, newName }));
    } catch (err) {
      this.fileStore.dispatch(new RenameFileFail({ file: file, newName }));
    }
  }

  public async save(file: BudgetFile, newContent: string) {
    try {
      await this.client.filesUpload({ path: `/${file.name}`, contents: newContent, mode: { '.tag': 'overwrite' } });
      this.fileStore.dispatch(new SaveFileSuccess(name));
    } catch (err) {
      this.fileStore.dispatch(new SaveFileFail(name));
    }
  }
}
