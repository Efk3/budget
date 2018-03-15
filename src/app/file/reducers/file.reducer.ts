import { FileActions, FileActionTypes } from '../actions/file.action';
import { adapter, FileState, initialState } from './file.state';

export function reducer(state = initialState, action: FileActions): FileState {
  switch (action.type) {
    case FileActionTypes.GetFiles: {
      return {
        ...state,
        loadFilesStatus: 'IN_PROGRESS',
        loadFilesError: null,
      };
    }

    case FileActionTypes.GetFilesSuccess: {
      return {
        ...adapter.addMany(action.payload.files, adapter.removeAll(state)),
        loadFilesStatus: 'DONE',
      };
    }

    case FileActionTypes.GetFilesFail: {
      return {
        ...state,
        loadFilesStatus: 'ERROR',
        loadFilesError: action.payload.message,
      };
    }

    case FileActionTypes.GetFile: {
      return {
        ...state,
        loadedFileId: null,
        loadedFileContent: null,
        loadFileStatus: 'IN_PROGRESS',
        loadFileError: null,
      };
    }

    case FileActionTypes.GetFileSuccess: {
      return {
        ...state,
        loadFileStatus: 'DONE',
        loadedFileId: action.payload.file.id,
        loadedFileContent: action.payload.content,
      };
    }

    case FileActionTypes.GetFileFail: {
      return {
        ...state,
        loadFileStatus: 'ERROR',
        loadFileError: action.payload,
      };
    }

    case FileActionTypes.CreateFileSuccess: {
      return adapter.addOne(action.payload, state);
    }

    case FileActionTypes.RemoveFileSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case FileActionTypes.RenameFileSuccess: {
      return adapter.updateOne(
        {
          id: action.payload.file.id,
          changes: {
            name: action.payload.newName,
          },
        },
        state
      );
    }

    default: {
      return state;
    }
  }
}
