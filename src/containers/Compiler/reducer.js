import { handleActions } from 'redux-actions';

const initialState = {
  error: null,
  logs: [],
};

const reducer = handleActions({
  RUNTIME_ERROR: (state, action) => ({
    ...state,
    error: action.error,
  }),
  CONSOLE_LOG: (state, action) => ({
    ...state,
    logs: [...state.logs, action.log],
  }),
}, initialState);

export default reducer;

