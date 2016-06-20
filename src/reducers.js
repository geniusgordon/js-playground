import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import editorReducer from './containers/Editor/reducer';
import compilerReducer from './containers/Compiler/reducer';

export default combineReducers({
  app: appReducer,
  editor: editorReducer,
  compiler: compilerReducer,
});

