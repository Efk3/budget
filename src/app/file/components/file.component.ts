import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { getSnapshot } from '../../utils/get-snapshot';
import { CreateFile, GetFile, GetFiles, RemoveFile, RenameFile, SaveFile } from '../actions/file.action';
import { BudgetFile } from '../models/budget-file.model';
import {
  selectFiles,
  selectLoadedFile,
  selectLoadedFileContent,
  selectLoadFilesError,
  selectLoadFilesStatus,
  selectLoadFileStatus,
} from '../reducers/file.selector';
import { FileState } from '../reducers/file.state';

@Component({
  selector: 'file-handler',
  templateUrl: 'file.component.html',
})
export class FileComponent implements OnInit, OnDestroy {
  public fileName: string;
  public newName: string;
  public selectedFile: BudgetFile;

  public files = this.fileStore.select(selectFiles);
  public filesLoadStatus = this.fileStore.select(selectLoadFilesStatus);
  public filesLoadError = this.fileStore.select(selectLoadFilesError);

  public fileLoadStatus = this.fileStore.select(selectLoadFileStatus);
  public loadedFile = this.fileStore.select(selectLoadedFile);
  public loadedFileContent = this.fileStore.select(selectLoadedFileContent);
  public content: string;

  private loadedFileContentSubscription: Subscription;

  constructor(private fileStore: Store<FileState>) {}

  public ngOnInit(): void {
    this.loadedFileContentSubscription = this.loadedFileContent.subscribe(content => (this.content = content));
  }

  public ngOnDestroy(): void {
    if (this.loadedFileContentSubscription) {
      this.loadedFileContentSubscription.unsubscribe();
    }
  }

  public getFiles() {
    this.fileStore.dispatch(new GetFiles());
  }

  public getFile(file: BudgetFile) {
    this.fileStore.dispatch(new GetFile(file));
  }

  public createFile() {
    if (!this.fileName) {
      return;
    }

    this.fileStore.dispatch(new CreateFile(this.fileName));
    this.fileName = undefined;
  }

  public deleteFile(file: BudgetFile) {
    this.fileStore.dispatch(new RemoveFile(file));
  }

  public renameFile() {
    if (!this.selectedFile || !this.newName) {
      return;
    }

    this.fileStore.dispatch(new RenameFile({ file: this.selectedFile, newName: this.newName }));
    this.newName = undefined;
  }

  public async save() {
    const file = await getSnapshot(this.loadedFile);

    if (!file) {
      return;
    }

    this.fileStore.dispatch(new SaveFile({ file, newContent: this.content }));
  }
}
