import { Action } from '@ngrx/store';
import { BudgetFile } from '../models/budget-file.model';

export enum FileActionTypes {
  GetFiles = '[FILE] Get Files',
  GetFilesSuccess = '[FILE] Get Files Success',
  GetFilesFail = '[FILE] Get Files Fail',

  GetFile = '[FILE] Get File',
  GetFileSuccess = '[FILE] Get File Success',
  GetFileFail = '[FILE] Get File Fail',

  CreateFile = '[FILE] Create File',
  CreateFileSuccess = '[FILE] Create File Success',
  CreateFileFail = '[FILE] Create File Fail',

  SaveFile = '[FILE] Save File',
  SaveFileSuccess = '[FILE] Save File Success',
  SaveFileFail = '[FILE] Save File Fail',

  RenameFile = '[FILE] Rename File',
  RenameFileSuccess = '[FILE] Rename File Success',
  RenameFileFail = '[FILE] Rename File Fail',

  RemoveFile = '[FILE] Remove File',
  RemoveFileSuccess = '[FILE] Remove File Success',
  RemoveFileFail = '[FILE] Remove File Fail',
}

/**
 * Get files actions
 */
export class GetFiles implements Action {
  public readonly type = FileActionTypes.GetFiles;
  public payload;

  constructor() {}
}

export class GetFilesFail implements Action {
  public readonly type = FileActionTypes.GetFilesFail;

  constructor(public payload: { message: string; error: any }) {}
}

export class GetFilesSuccess implements Action {
  public readonly type = FileActionTypes.GetFilesSuccess;

  constructor(public payload: { files: BudgetFile[] }) {}
}

/**
 * Get file actions
 */
export class GetFile implements Action {
  public readonly type = FileActionTypes.GetFile;
  constructor(public payload: BudgetFile) {}
}

export class GetFileSuccess implements Action {
  public readonly type = FileActionTypes.GetFileSuccess;
  constructor(public payload: { file: BudgetFile; content: string }) {}
}

export class GetFileFail implements Action {
  public readonly type = FileActionTypes.GetFileFail;
  constructor(public payload: string) {}
}

/**
 * Create file actions
 */
export class CreateFile implements Action {
  public readonly type = FileActionTypes.CreateFile;

  constructor(public payload: string) {}
}

export class CreateFileSuccess implements Action {
  public readonly type = FileActionTypes.CreateFileSuccess;

  constructor(public payload: BudgetFile) {}
}

export class CreateFileFail implements Action {
  public readonly type = FileActionTypes.CreateFileFail;

  constructor(public payload: string) {}
}

/**
 * Save file actions
 */
export class SaveFile implements Action {
  public readonly type = FileActionTypes.SaveFile;

  constructor(public payload: { file: BudgetFile; newContent: string }) {}
}

export class SaveFileSuccess implements Action {
  public readonly type = FileActionTypes.SaveFileSuccess;

  constructor(public payload: BudgetFile) {}
}

export class SaveFileFail implements Action {
  public readonly type = FileActionTypes.SaveFileFail;

  constructor(public payload: BudgetFile) {}
}

/**
 * Rename file actions
 */
export class RenameFile implements Action {
  public readonly type = FileActionTypes.RenameFile;

  constructor(public payload: { file: BudgetFile; newName: string }) {}
}

export class RenameFileSuccess implements Action {
  public readonly type = FileActionTypes.RenameFileSuccess;

  constructor(public payload: { file: BudgetFile; newName: string }) {}
}

export class RenameFileFail implements Action {
  public readonly type = FileActionTypes.RenameFileFail;

  constructor(public payload: { file: BudgetFile; newName: string }) {}
}

/**
 * Delete file actions
 */
export class RemoveFile implements Action {
  public readonly type = FileActionTypes.RemoveFile;

  constructor(public payload: BudgetFile) {}
}

export class RemoveFileSuccess implements Action {
  public readonly type = FileActionTypes.RemoveFileSuccess;

  constructor(public payload: BudgetFile) {}
}

export class RemoveFileFail implements Action {
  public readonly type = FileActionTypes.RemoveFileFail;

  constructor(public payload: BudgetFile) {}
}

export type FileActions =
  | GetFiles
  | GetFilesSuccess
  | GetFilesFail
  | GetFile
  | GetFileSuccess
  | GetFileFail
  | CreateFile
  | CreateFileSuccess
  | CreateFileFail
  | SaveFile
  | SaveFileSuccess
  | SaveFileFail
  | RenameFile
  | RenameFileSuccess
  | RenameFileFail
  | RemoveFile
  | RemoveFileSuccess
  | RemoveFileFail;
