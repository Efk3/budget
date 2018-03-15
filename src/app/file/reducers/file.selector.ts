import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, FileState } from './file.state';

const selectors = adapter.getSelectors();

export const selectFileState = createFeatureSelector<FileState>('file');

export const selectLoadFilesStatus = createSelector(selectFileState, (state: FileState) => state.loadFilesStatus);
export const selectLoadFilesError = createSelector(selectFileState, (state: FileState) => state.loadFilesError);

export const selectFiles = createSelector(selectFileState, selectors.selectAll);
export const selectFileEntities = createSelector(selectFileState, selectors.selectEntities);

export const selectLoadFileStatus = createSelector(selectFileState, (state: FileState) => state.loadFileStatus);
export const selectLoadFileError = createSelector(selectFileState, (state: FileState) => state.loadFileError);
export const selectLoadedFileId = createSelector(selectFileState, (state: FileState) => state.loadedFileId);
export const selectLoadedFile = createSelector(selectFileEntities, selectLoadedFileId, (files, id) => files[id]);
export const selectLoadedFileContent = createSelector(selectFileState, (state: FileState) => state.loadedFileContent);
