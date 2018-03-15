import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadStatus } from '../../utils/load-status';
import { BudgetFile } from '../models/budget-file.model';

export interface FileState extends EntityState<BudgetFile> {
  loadFilesStatus?: LoadStatus;
  loadFilesError?: string;

  loadFileStatus?: LoadStatus;
  loadFileError?: string;
  loadedFileId?: string;
  loadedFileContent?: string;
}

export const adapter: EntityAdapter<BudgetFile> = createEntityAdapter<BudgetFile>({});

export const initialState: FileState = adapter.getInitialState({});
