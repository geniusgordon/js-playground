import { handleActions } from 'redux-actions';
import initialEditorState from './editorState';

const reducer = handleActions({
  EDIT: (state, action) => action.editorState,
}, initialEditorState);

export default reducer;

