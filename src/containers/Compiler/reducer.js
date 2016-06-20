import { handleActions } from 'redux-actions';

const initialState = {
  running: false,
  error: false,
  runtime: -1,
};

const reducer = handleActions({
  EXECUTE: (state) => ({
    ...state,
    running: true,
    error: false,
  }),
  TERMINATE: (state) => ({
    ...state,
    running: false,
  }),
}, initialState);

export default reducer;

