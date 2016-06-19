import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import editorReducer from './containers/Editor/reducer';

export default combineReducers({
  app: appReducer,
  editor: editorReducer,
});

