import { handleActions } from 'redux-actions';
import { EditorState } from 'draft-js';
import initialEditorState from './editorState';

const reducer = handleActions({
  EDIT: (state, action) => action.editorState,
  DECORATOR_HOT_RELOAD: (state, action) => (
    EditorState.set(state, { decorator: action.decorator })
  ),
}, initialEditorState);

export default reducer;

